import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SERVER_RESOURCE_URL } from 'config';
// import UserImage from 'components/UserImage';
// import UserFullName from 'components/UserFullName';

import styles from './Message.scss';

export default class Message extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
  }
  render() {
    const { message } = this.props;
    let profilePicUrl = null;
    if (message.profilePicUrl) {
      profilePicUrl = `${SERVER_RESOURCE_URL}${message.profilePicUrl}`;
      profilePicUrl = profilePicUrl.replace('%s', '_50_square');
    }
    return (
      <div className={styles.root}>
        {profilePicUrl &&
          <img className={styles.userImage} src={profilePicUrl} alt={message.username} />
        }
        {!profilePicUrl &&
          <div className={styles.userImage} />
        }
        <div className={styles.userDetail}>
          <div className={styles.userName}>{message.username}</div>
          <div>{message.message}</div>
        </div>
      </div>
    );
  }
}

// export default Relay.createContainer(Member, {
//   fragments: {
//     user: () => Relay.QL`
//       fragment on User {
//         id
//         username
//         fullName
//         profilePicUrl
//       }
//     `
//   }
// });
