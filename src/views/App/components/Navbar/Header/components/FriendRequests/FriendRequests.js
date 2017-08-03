import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Badge, IconButton, Menu, MenuItem, Button } from 'react-mdl';
import { Link } from 'react-router';
import AnswerAddFriendMutation from 'mutations/Relationship/AnswerAddFriendMutation';

import styles from './FriendRequests.scss';

class FriendRequests extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };
  onAnswerAddFriend(userId, index, choice) {
    const answerAddFriendMutation = new AnswerAddFriendMutation({
      userId,
      choice
    });

    Relay.Store.commitUpdate(answerAddFriendMutation, {
      onSuccess: () => {
        this.forceUpdate();
      }
    });
  }
  render() {
    const friendRequests = this.props.viewer.allRequests.data.edges;
    const unread = this.props.viewer.allRequests.unread;
    return (
      <div className={styles.root}>
        {unread > 0 &&
          <Badge text={unread} overlap>
            <IconButton className={styles.friendRequestsBtn} name='supervisor_account' id='friend_requests' />
          </Badge>
        }
        {unread === 0 &&
          <IconButton className={styles.friendRequestsBtn} name='supervisor_account' id='friend_requests' />
        }
        <Menu target='friend_requests' align='right'>
          <MenuItem className={styles.title}>
            Friend Request
          </MenuItem>
          {friendRequests.length > 0 &&
            friendRequests.map((friendRequest, index) =>
              <MenuItem key={friendRequest.node.id} className={styles.friendRequestItem}>
                <Link to={friendRequest.node.link}>
                  <div className={styles.friendRequestContent}>
                    <img src={`${friendRequest.node.previewImage.replace('%s', '_50_square')}`} alt={friendRequest.node.name} />
                    <span className={styles.username}>{friendRequest.node.name}</span>
                    <div className={styles.friendRequestFunc}>
                      <Button
                        colored raised ripple style={{ marginLeft: '10px', color: '#fff' }}
                        onClick={() => this.onAnswerAddFriend(friendRequest.node.userId, index, true)}
                      >
                        Accept
                      </Button>
                      <Button
                        raised ripple style={{ marginLeft: '10px' }}
                        onClick={() => this.onAnswerAddFriend(friendRequest.node.userId, index, false)}
                      >
                        Ignore
                      </Button>
                    </div>
                  </div>
                </Link>
              </MenuItem>
            )
          }
          {friendRequests.length === 0 &&
            (<MenuItem>
              No friend request!
            </MenuItem>)
          }
          <MenuItem className={styles.viewMore}>
            <Link to='/friendRequests'>View all</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default Relay.createContainer(FriendRequests, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allRequests {
          unread
          data(first: 10) {
            edges {
              node {
                id
                userId
                name
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
