import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import AddFeedForm from './components/AddFeedForm';
import Feed from './components/Feed';

import styles from './Timeline.scss';

class Timeline extends Component {
  static propTypes = {
    relay: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
    parentId: PropTypes.string
  };

  static defaultProps = {
    parentId: null
  };

  componentDidMount() {
    const { relay, parentId } = this.props;

    relay.setVariables({ parentId });
  }

  render() {
    const feeds = this.props.viewer.allFeeds.edges;
    feeds.sort((a, b) => (a.node.createdAt < b.node.createdAt ? 1 : -1));

    return (
      <div className={styles.root}>
        <AddFeedForm parentId={this.props.parentId} />
        {feeds.map(({ node: feed }) =>
          <Feed
            key={feed.id}
            feed={feed}
          />
        )}
      </div>
    );
  }
}

export default Relay.createContainer(Timeline, {
  initialVariables: {
    parentId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allFeeds(first: 100, toId: $parentId) {
          edges {
            node {
              id
              createdAt
              ${Feed.getFragment('feed')}
            }
          }
        }
      }
    `
  }
});
