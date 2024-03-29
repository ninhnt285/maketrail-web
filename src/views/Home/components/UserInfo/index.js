import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import UserImage from 'components/UserImage';

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
              <li>World: {user.visitedNumber} Countries</li>
              {(user.favouriteCountry) &&
                <li>{user.favouriteCountry}</li>
              }
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
        visitedNumber
        favouriteCountry
      }
    `
  }
});
