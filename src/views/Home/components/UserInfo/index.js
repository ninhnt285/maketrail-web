import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import UserImage from 'components/UserImage';
import mapCover from 'assets/map_cover.png';

import styles from './UserInfo.scss';

class UserInfo extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.mapCover}>
          <img src={user.map} alt={user.username} className={styles.map} />
        </div>
        <div className={styles.content}>
          <div className={styles.userAvatar}>
            <UserImage className={styles.userImage} user={user} size={50} />
          </div>
          <div className={styles.detail}>
            <Link className={styles.fullName} to={`/profile/${user.id}`}>{user.fullName}</Link>
          </div>
          <div className={styles.checkinInfo}>
            <p>Checked-in:</p>
            <ul>
              <li>World: 4/196 Countries (2%)</li>
              <li>Vietnam: 12/63 Cities (19%)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(UserInfo, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        username
        fullName
        profilePicUrl
        map
      }
    `
  }
});
