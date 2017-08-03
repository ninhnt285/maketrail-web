import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Badge, IconButton, Menu, MenuItem, Button } from 'react-mdl';
import { Link } from 'react-router';

import AnswerInviteMutation from 'mutations/Notification/AnswerInviteMutation';

import styles from './Notifications.scss';

class Notifications extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };
  onAnswerInvite(notificationId, choice) {
    const answerInviteMutation = new AnswerInviteMutation({
      notificationId,
      choice
    });

    Relay.Store.commitUpdate(answerInviteMutation, {
      onSuccess: () => {
        this.forceUpdate();
      }
    });
  }

  render() {
    const notifications = this.props.viewer.allNotifications.data.edges;
    const unread = this.props.viewer.allNotifications.unread;
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
            notifications.map(notification =>
              <MenuItem key={notification.node.id} className={styles.notificationItem}>
                <Link to={notification.node.link}>
                  <div className={styles.notificationContent}>
                    <img src={`${notification.node.previewImage.replace('%s', '_50_square')}`} alt={notification.node.story} />
                    <span>{notification.node.story}</span>
                    {(notification.node.type === 'inviteToTrip') &&
                      <div className={styles.notificationFunc}>
                        <Button colored raised ripple style={{ marginLeft: '10px', color: '#fff' }}onClick={() => this.onAnswerInvite(notification.node.id, true)}>Accept</Button>
                        <Button raised ripple style={{ marginLeft: '10px' }}onClick={() => this.onAnswerInvite(notification.node.id, false)}>Ignore</Button>
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
                story
                link
                previewImage
              }
            }
          }
        }
      }
    `
  }
});
