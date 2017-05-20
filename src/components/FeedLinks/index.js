import React, { Component } from 'react';

import styles from './FeedLinks.scss';

export default class FeedLinks extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <a className={styles.link}>Like</a>
          <a className={styles.link}>Comment</a>
          <a className={styles.link}>Share</a>
        </div>
      </div>
    );
  }
}
