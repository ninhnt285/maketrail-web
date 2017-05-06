import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import UserImage from 'components/UserImage';

import styles from './Member.scss';

class Member extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props;

    return (
      <div className={styles.root}>
        <UserImage className={styles.userImage} user={user} />
        <div className={styles.userDetail}>
          <span>{user.fullName}</span>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Member, {
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
