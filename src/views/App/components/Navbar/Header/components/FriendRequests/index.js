import React, { Component } from 'react';
import { Badge, IconButton, Menu, MenuItem } from 'react-mdl';
import { Link } from 'react-router';

import UserImage from 'components/UserImage';

import styles from '../Notifications/Notifications.scss';

export default class FriendRequests extends Component {
  render() {
    const requests = [
      {
        id: 1,
        user: {
          id: 1,
          username: 'user1',
          fullName: 'User 1',
          profilePicUrl: 'http://static.maketrail.com/noImage/noImage%s.png'
        }
      },
      {
        id: 2,
        user: {
          id: 1,
          username: 'user2',
          fullName: 'User 2',
          profilePicUrl: 'http://static.maketrail.com/noImage/noImage%s.png'
        }
      }
    ];

    return (
      <div className={styles.root}>
        <Badge text='2'>
          <IconButton className={styles.notificationBtn} name='people' id='global_friend_requests' />
        </Badge>
        {requests.length > 0 &&
          <Menu target='global_friend_requests' align='right'>
            <MenuItem className={styles.title}>
              Friend Requests
            </MenuItem>
            {requests.map(request =>
              <MenuItem key={request.id}>
                <UserImage user={request.user} />
                <div className={styles.notificationContent}>
                  <Link to={`/profile/${request.user.id}`}><b>{request.user.fullName}</b></Link>
                  <button style={{ marginLeft: '20px' }}>Accept</button>
                  <button>Decline</button>
                </div>
              </MenuItem>
            )}
            <MenuItem className={styles.viewMore}>
              <Link to='/friend-requests'>View all</Link>
            </MenuItem>
          </Menu>
        }
      </div>
    );
  }
}
