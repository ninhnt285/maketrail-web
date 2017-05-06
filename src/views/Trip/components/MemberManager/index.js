import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import InviteMemberMutation from 'mutations/User/InviteMemberMutation';

import UserFinder from './components/UserFinder';
import Member from './components/Member';
import styles from './MemberManager.scss';

export default class MemberManager extends Component {
  static propTypes = {
    tripId: PropTypes.string.isRequired,
    members: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.onAddUser = this.onAddUser.bind(this);
  }

  onAddUser(userId) {
    const inviteMemberMutation = new InviteMemberMutation({
      tripId: this.props.tripId,
      memberId: userId
    });

    Relay.Store.commitUpdate(
      inviteMemberMutation
    );
  }

  render() {
    const { edges: users } = this.props.members;

    return (
      <div className={styles.root}>
        <UserFinder onAddUser={this.onAddUser} />
        {users.length > 0 &&
          <div className={styles.memberList}>
            {users.map(({ node: user }) =>
              <Member key={user.id} user={user} />
            )}
          </div>
        }
      </div>
    );
  }
}
