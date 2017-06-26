import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { extendClassName } from 'libs/component';

import AddFeedForm from './components/AddFeedForm';
import Feed from './components/Feed';
import styles from './Timeline.scss';

class Timeline extends Component {
  static propTypes = {
    relay: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
    parentId: PropTypes.string,
    places: PropTypes.array,
  };

  static defaultProps = {
    parentId: null,
    places: [],
  };
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }
  componentDidMount() {
    const { relay, parentId } = this.props;

    relay.setVariables({ parentId });
  }

  loadMore() {
    const count = this.props.relay.variables.count + 2;
    this.props.relay.setVariables({
      count,
    });
  }
  render() {
    const feeds = this.props.viewer.allFeeds.edges;
    // feeds.sort((a, b) => (a.node.createdAt < b.node.createdAt ? 1 : -1));

    // const count = this.props.relay.variables.count;
    return (
      <div className={extendClassName(this.props, styles.root)}>
        <AddFeedForm parentId={this.props.parentId} places={this.props.places} />
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
    parentId: null,
    count: 100,
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allFeeds(first: $count, toId: $parentId) {
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
