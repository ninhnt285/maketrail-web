import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import FeedHeader from './components/FeedHeader';
import styles from './Feed.scss';

class Feed extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired
  };

  render() {
    const { feed } = this.props;

    return (
      <div className={styles.root}>
        <FeedHeader
          user={feed.user}
          timestamp={0}
          privacy={feed.privacy}
        />
        <p>{feed.text}</p>
      </div>
    );
  }
}

export default Relay.createContainer(Feed, {
  fragments: {
    feed: () => Relay.QL`
      fragment on Feed {
        id
        user {
          id
          username
          fullName
          profilePicUrl
        }
        text
      }
    `
  }
});
