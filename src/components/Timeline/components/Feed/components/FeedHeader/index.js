import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import UserImage from 'components/UserImage';
import UserFullName from 'components/UserFullName';

import styles from './FeedHeader.scss';

export default class FeedHeader extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    timestamp: PropTypes.number.isRequired
  };

  render() {
    const { user } = this.props;

    return (
      <div className={styles.root}>
        <UserImage
          className={styles.userImage}
          user={user}
          size={40}
        />
        <div className={styles.detail}>
          <UserFullName user={user} />
          <div className={styles.dateTime}>
            <span>
              {moment.unix(this.props.timestamp).format('dddd, MMMM D YYYY [at] h:mm:ss a')}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
