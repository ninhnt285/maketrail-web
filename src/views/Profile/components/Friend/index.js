import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import UserImage from 'components/UserImage';

import styles from './Friend.scss';

class Friend extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props;
    return (
      <div className={styles.root}>
        <Link to={`/profile/${user.id}`} target='_blank'>
          <UserImage className={styles.userImage} user={user} />
          <div className={styles.userName}><span>{user.fullName}</span></div>
        </Link>
      </div>
    );
  }
}

export default Relay.createContainer(Friend, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        username
        fullName
        profilePicUrl
      }
    `
  }
});
