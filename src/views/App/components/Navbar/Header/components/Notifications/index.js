import React, { Component } from 'react';
import { Badge, IconButton, Menu, MenuItem } from 'react-mdl';
import { SERVER_URL } from 'config';
import { Link } from 'react-router';

import styles from './Notifications.scss';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isLoaded: false,
    };
    this.init();
  }
  init() {
    const accessToken = localStorage.getItem('accessToken');
    fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        query: `query {
                  viewer {
                    allNotifications {
                      unread
                      data(first: 10) {
                        edges {
                          node {
                            id
                            type
                            from {
                              __typename
                              ... on User {
                                id
                                username
                                fullName
                                profilePicUrl
                              }
                              ... on Trip {
                                id
                                name
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }`,
      })
    }).then(response => response.json())
    .then((responseJson) => {
      this.setState({ notifications: responseJson.data.viewer.allNotifications.data.edges, isLoaded: true });
    });
  }

  render() {
    const { notifications, isLoaded } = this.state;
    if (!isLoaded) {
      return null;
    }
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
                    {notification.node.from.map(from =>
                      <b key={from.id}>{(from.__typename === 'User') ? from.fullName : ''} </b>
                    )}
                    <span>{notification.node.type} </span>
                    {notification.node.from.map(from =>
                      <b key={from.id}>{(from.__typename === 'Trip') ? from.name : ''}</b>
                    )}
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
