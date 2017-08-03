import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button } from 'react-mdl';

import UserImage from 'components/UserImage';

import styles from './Suggestion.scss';

export default class Suggestion extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  };

  onFollow() {
    return true;
  }

  render() {
    const { users } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h3 className={styles.title}>Suggestions For You</h3>
          <Link className={styles.viewMore} to='/explore/people'>View all</Link>
        </div>
        <div className={styles.content}>
          {users.map(({ node: user }) =>
            <div key={user.id} className={styles.suggesstionRow}>
              <UserImage className={styles.userImage} user={user} size={32} />
              <div className={styles.userInfo}>
                <Link to={`/profile/${user.id}`}>{user.username}</Link>
                <p>{user.fullName}</p>
              </div>
              {!user.relationship.isFollow &&
                <Button onClick={this.onFollow} colored raised ripple className={styles.followBtn}>Follow</Button>
              }
            </div>
          )}
        </div>
      </div>
    );
  }
}
