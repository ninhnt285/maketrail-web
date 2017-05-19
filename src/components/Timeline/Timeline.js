import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import AddFeedBox from './components/AddFeedBox';
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

    return (
      <div className={styles.root}>
        <AddFeedBox parentId={this.props.parentId} />
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
              ${Feed.getFragment('feed')}
            }
          }
        }
      }
    `
  }
});
