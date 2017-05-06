import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FeedHeader from './components/FeedHeader';
import styles from './Feed.scss';

export default class Feed extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired
  };

  render() {
    const { feed } = this.props;

    return (
      <div className={styles.root}>
        <FeedHeader
          user={feed.user}
          timestamp={feed.timestamp}
          privacy={feed.privacy}
        />
        <p>{feed.text}</p>
        <img className={styles.photoPreview} src={feed.photoUrl} alt={feed.text} />
      </div>
    );
  }
}
