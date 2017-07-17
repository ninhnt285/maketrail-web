import Relay from 'react-relay';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedComponent from 'components/Timeline/components/Feed';

import styles from './Feed.scss';

class FeedView extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div className={styles.root}>
        <FeedComponent feed={this.props.viewer.Feed} showComment />
      </div>
    );
  }
}
export default Relay.createContainer(FeedView, {
  initialVariables: {
    feedId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        Feed(id: $feedId) {
          id
          ${FeedComponent.getFragment('feed')}
        }
      }
    `
  }
});
