import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserImage from 'components/UserImage';
import UserFullName from 'components/UserFullName';

import styles from './Message.scss';

export default class Message extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
  }
  render() {
    const { message } = this.props;
    return (
      <div className={styles.root}>
        <UserImage userId={message.fromId} className={styles.userImage} />
        <div className={styles.userDetail}>
          <UserFullName className={styles.userName} userId={message.fromId} />
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
