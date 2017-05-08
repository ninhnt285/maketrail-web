import React, { Component } from 'react';

import Feed from 'components/Feed';
import AddFeedBox from 'components/AddFeedBox';

import styles from './Timeline.scss';

export default class Timeline extends Component {
  render() {
    const feeds = [
      {
        id: 1,
        __typename: 'FeedPhoto',
        user: {
          username: 'ninhnt',
          fullName: 'Ninh Nguyen',
          profilePicUrl: null
        },
        privacy: 0,
        timestamp: 1494098486,
        text: 'Welcome to New York',
        photoUrl: 'https://media.timeout.com/images/103444978/image.jpg'
      },
      {
        id: 2,
        __typename: 'FeedPhoto',
        user: {
          username: 'ninhnt',
          fullName: 'Ninh Nguyen',
          profilePicUrl: null
        },
        privacy: 0,
        timestamp: 1494098586,
        text: 'Check-in at Statue of Liberty',
        photoUrl: 'http://vntours.com.vn/pic/Tour/hoa-ky_635957093953747670.jpg'
      }
    ];

    return (
      <div className={styles.root}>
        <AddFeedBox />
        {feeds.map(feed =>
          <Feed
            key={feed.id}
            feed={feed}
          />
        )}
      </div>
    );
  }
}
