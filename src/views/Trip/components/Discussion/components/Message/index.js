import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-mdl';

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
    let profilePicView = (<div className={styles.userImage} />);
    if (message.profilePicUrl) {
      profilePicUrl = `${SERVER_RESOURCE_URL}${message.profilePicUrl}`;
      profilePicUrl = profilePicUrl.replace('%s', '_50_square');
      profilePicView = (<img className={styles.userImage} src={profilePicUrl} alt={message.username} />);
    }
    return (
      <div className={styles.root}>
        <Tooltip label={message.username} position='top' style={{ float: 'left' }}>
          {profilePicView}
        </Tooltip>
        <div className={styles.userDetail}>
          {message.message}
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
