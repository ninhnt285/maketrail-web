import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './FeedLinks.scss';

export default class FeedLinks extends Component {
  static propTypes = {
    onShowComment: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <button className={styles.link}>Like</button>
          <button className={styles.link} onClick={this.props.onShowComment}>Comment</button>
          <button className={styles.link}>Share</button>
        </div>
      </div>
    );
  }
}
