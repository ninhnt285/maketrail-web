import React, { Component } from 'react';
import Relay from 'react-relay';
import { Badge, IconButton, Menu, MenuItem, Button } from 'react-mdl';
import { SERVER_URL } from 'config';
import { Link } from 'react-router';

import AnswerInviteMutation from 'mutations/Notification/AnswerInviteMutation';

import styles from './Notifications.scss';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isLoaded: false,
      unread: 0,
    };
    this.init();
  }
  onAnswerInvite(index, choice) {
    const notifications = this.state.notifications;
    const answerInviteMutation = new AnswerInviteMutation({
      notificationId: notifications[index].node.id,
      choice
    });

    Relay.Store.commitUpdate(answerInviteMutation, {
      onSuccess: () => {
        notifications[index].node.isAnswered = true;
        this.setState({ notifications });
      }
    });
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
                            story
                            link
                          }
                        }
                      }
                    }
                  }
                }`,
      })
    }).then(response => response.json())
    .then((responseJson) => {
      this.setState({
        unread: responseJson.data.viewer.allNotifications.unread,
        notifications: responseJson.data.viewer.allNotifications.data.edges,
        isLoaded: true
      });
    });
  }
  render() {
    const { notifications, isLoaded, unread } = this.state;
    if (!isLoaded) {
      return null;
    }
    console.log('notifications', isLoaded);
    return (
      <div className={styles.root}>
        {unread > 0 &&
          <Badge text={unread} overlap>
            <IconButton className={styles.notificationBtn} name='public' id='global_notifications' />
          </Badge>
        }
        {unread === 0 &&
          <IconButton className={styles.notificationBtn} name='public' id='global_notifications' />
        }
        <Menu target='global_notifications' align='right' className={styles.notificationWrap}>
          <MenuItem className={styles.title}>
            Notifications
          </MenuItem>
          {notifications.length > 0 &&
            notifications.map((notification, index) =>
              <MenuItem key={notification.node.id} className={styles.notificationItem}>
                <Link to={notification.node.link}>
                  <div className={styles.notificationContent}>
                    <span>{notification.node.story} </span>
                    {(notification.node.type === 'inviteToTrip') && (!notification.node.isAnswered) &&
                      <div className={styles.notificationFunc}>
                        <Button colored raised ripple style={{ marginLeft: '10px' }}onClick={() => this.onAnswerInvite(index, true)}>Accept</Button>
                        <Button raised ripple style={{ marginLeft: '10px' }}onClick={() => this.onAnswerInvite(index, false)}>Ignore</Button>
                      </div>
                    }
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
