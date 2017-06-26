import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon } from 'react-mdl';
import UserImage from 'components/UserImage';
import UserFullName from 'components/UserFullName';

import styles from './FeedHeader.scss';

export default class FeedHeader extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    timestamp: PropTypes.number.isRequired,
    placeName: PropTypes.string,
    placeId: PropTypes.string,
  };
  static defaultProps = {
    placeName: '',
    placeId: '',
  }
  render() {
    const { user, timestamp, placeName, placeId } = this.props;

    return (
      <div className={styles.root}>
        <UserImage
          className={styles.userImage}
          user={user}
          size={40}
        />
        <div className={styles.detail}>
          <div>
            <UserFullName user={user} style={{ display: 'inline-block' }} />
            {placeId &&
              <div className={styles.placeWrap}>&nbsp;was in
                &nbsp;<Icon name='place' className={styles.place} />
                &nbsp;<span className={styles.place}>{placeName}</span>
                .
              </div>
            }
          </div>
          <div className={styles.dateTime}>
            <span>
              {moment.unix(timestamp).format('dddd, MMMM D YYYY [at] h:mm:ss a')}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
