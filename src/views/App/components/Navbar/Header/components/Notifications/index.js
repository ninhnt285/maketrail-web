import React, { Component } from 'react';
import { Badge, IconButton, Menu, MenuItem } from 'react-mdl';
import { Link } from 'react-router';

import UserImage from 'components/UserImage';

import styles from './Notifications.scss';

export default class Notifications extends Component {
  render() {
    const notifications = [
      {
        id: 1,
        text: 'liked your comment.',
        user: {
          id: 1,
          username: 'admin',
          fullName: 'Admin',
          profilePicUrl: 'http://static.maketrail.com/noImage/noImage%s.png'
        }
      },
      {
        id: 2,
        text: 'followed your trip.',
        user: {
          id: 1,
          username: 'admin',
          fullName: 'Admin',
          profilePicUrl: 'http://static.maketrail.com/noImage/noImage%s.png'
        }
      }
    ];

    return (
      <div className={styles.root}>
        <Badge text='2'>
          <IconButton className={styles.notificationBtn} name='public' id='global_notifications' />
        </Badge>
        {notifications.length > 0 &&
          <Menu target='global_notifications' align='right'>
            {notifications.map(notification =>
              <MenuItem key={notification.id}>
                <Link to='/'>
                  <UserImage user={notification.user} />
                  <div className={styles.notificationContent}>
                    <b>{notification.user.fullName}</b> <span>{notification.text}</span>
                  </div>
                </Link>
              </MenuItem>
            )}
            <MenuItem className={styles.viewMore}>
              <Link to='/notifications'>View all</Link>
            </MenuItem>
          </Menu>
        }
      </div>
    );
  }
}
