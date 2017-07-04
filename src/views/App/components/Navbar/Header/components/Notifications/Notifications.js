import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Badge, IconButton, Menu, MenuItem } from 'react-mdl';
import { Link } from 'react-router';

// import UserImage from 'components/UserImage';33

import styles from './Notifications.scss';

class Notifications extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  render() {
    const notifications = this.props.viewer.allNotifications.data.edges;

    return (
      <div className={styles.root}>
        {notifications.length > 0 &&
          <Badge text={notifications.length} overlap>
            <IconButton className={styles.notificationBtn} name='public' id='global_notifications' />
          </Badge>
        }
        {notifications.length === 0 &&
          <IconButton className={styles.notificationBtn} name='public' id='global_notifications' />
        }
        <Menu target='global_notifications' align='right'>
          <MenuItem className={styles.title}>
            Notifications
          </MenuItem>
          {notifications.length > 0 &&
            notifications.map(notification =>
              <MenuItem key={notification.node.id}>
                <Link to='/'>
                  <div className={styles.notificationContent}>
                    <span>{notification.node.type} </span>
                  </div>
                </Link>
              </MenuItem>
            )
          }
          {notifications.length === 0 &&
            (<MenuItem>
              No notifications found!
            </MenuItem>)
          }
          <MenuItem className={styles.viewMore}>
            <Link to='/notifications'>View all</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default Relay.createContainer(Notifications, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allNotifications {
          unread
          data(first: 10) {
            edges {
              node {
                id
                type
              }
            }
          }
        }
      }
    `
  }
});
//
// from {
//   __typename
//   ... on User {
//     id
//     username
//     fullName
//     profilePicUrl
//   }
//   ... on Trip {
//     id
//     name
//   }
// }
// {notification.node.from.map(from =   >
//   <b key={from.id}>{(from.__typename === 'User') ? from.fullName : ''} </b>
// )}
// <span>{notification.node.type} </span>
// {notification.node.from.map(from =>
//   <b key={from.id}>{(from.__typename === 'Trip') ? from.name : ''}</b>
// )}
