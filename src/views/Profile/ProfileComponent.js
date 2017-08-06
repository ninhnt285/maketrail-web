import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab, IconButton, Menu, MenuItem } from 'react-mdl';

import { SERVER_RESOURCE_URL } from 'config';
import Map from 'components/Map';
import Timeline from 'components/Timeline';
import UserImage from 'components/UserImage';
import UserFullName from 'components/UserFullName';
import UpdateUserMutation from 'mutations/User/UpdateUserMutation';
import FollowMutation from 'mutations/Relationship/FollowMutation';
import UnfollowMutation from 'mutations/Relationship/UnfollowMutation';
import AddFriendMutation from 'mutations/Relationship/AddFriendMutation';
import UnfriendMutation from 'mutations/Relationship/UnfriendMutation';
import UploadAttachment from 'components/UploadAttachment';

import Trip from './components/Trip';
import Friend from './components/Friend';
import styles from './Profile.scss';

export default class ProfileComponent extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };

    this.onFollow = this.onFollow.bind(this);
    this.onAddFriend = this.onAddFriend.bind(this);
    this.onUnfollow = this.onUnfollow.bind(this);
    this.onUnfriend = this.onUnfriend.bind(this);
    this.onUploadedAttachment = this.onUploadedAttachment.bind(this);
    this.onUpdateUserImage = this.onUpdateUserImage.bind(this);
  }
  onUploadedAttachment(attachment) {
    this.onUpdateUserImage(attachment.filePathUrl);
  }
  onUpdateUserImage(picUrl) {
    let profilePicUrl = picUrl;
    if (profilePicUrl.charAt(SERVER_RESOURCE_URL) !== -1) {
      profilePicUrl = profilePicUrl.substring(SERVER_RESOURCE_URL.length);
    }
    const updateUserMutation = new UpdateUserMutation({
      profilePicUrl,
      userId: this.props.viewer.User.id
    });
    Relay.Store.commitUpdate(
      updateUserMutation
    );
  }
  onAddFriend() {
    const addFriendMutation = new AddFriendMutation({
      userId: this.props.viewer.User.id
    });

    Relay.Store.commitUpdate(addFriendMutation);
  }
  onUnfriend() {
    const unfriendMutation = new UnfriendMutation({
      userId: this.props.viewer.User.id
    });

    Relay.Store.commitUpdate(unfriendMutation);
  }
  onFollow() {
    const followMutation = new FollowMutation({
      userId: this.props.viewer.User.id
    });

    Relay.Store.commitUpdate(followMutation);
  }
  onUnfollow() {
    const unfollowMutation = new UnfollowMutation({
      userId: this.props.viewer.User.id
    });

    Relay.Store.commitUpdate(unfollowMutation);
  }

  render() {
    const { user: me, User: user } = this.props.viewer;
    let content = null;
    switch (this.state.activeTab) {
      case 0:
        content = (<Timeline
          className={styles.timeline}
          parentId={user.id}
        />);
        break;
      case 1: {
        const { edges: trips } = user.trips;
        content = (
          <div className={styles.tripsBlock}>
            {trips.length > 0 &&
              trips.map(({ node: trip }) =>
                <Trip key={trip.id} trip={trip} />
              )
            }
          </div>
        );
        break;
      }
      case 2: {
        const { edges: friends } = user.friends;
        content = (
          <div className={styles.friendsBlock}>
            {friends.length > 0 &&
              friends.map(({ node: friend }) =>
                <Friend key={friend.id} user={friend} />
              )
            }
          </div>
        );
        break;
      }
      default:
        content = null;
    }

    return (
      <div className={styles.root}>
        <div className={styles.profileCover}>
          <div>
            <Map userId={this.props.viewer.User.id} className={styles.map} />
          </div>
          <div className={styles.timelineHeadline}>
            <div className={styles.userAvatarWrap}>
              <UserImage user={user} className={styles.userAvatar} size={160} wrappLink={false} />
            </div>
            <UserFullName user={user} className={styles.userFullName} fontSize={28} wrappLink={false} />
            {(user.id === me.id) &&
              <div className={styles.userSetting}>
                <IconButton className={styles.settingBtn} name='settings' id='settings' />
                <Menu target='settings' align='right'>
                  <UploadAttachment multiple={false} onUploaded={this.onUploadedAttachment}>
                    <MenuItem>Upload Avatar</MenuItem>
                  </UploadAttachment>
                </Menu>
              </div>
            }
            {(user.id !== me.id) &&
              <div className={styles.actions}>
                {user.relationship.isSentRequest &&
                  <Button raised ripple className={styles.actionButton}>
                    Friend Request Send
                  </Button>
                }
                {!user.relationship.isFriend && !user.relationship.isSentRequest &&
                  <Button onClick={this.onAddFriend} colored raised ripple className={styles.actionButton}>
                    Add friend
                  </Button>
                }
                {user.relationship.isFriend && !user.relationship.isSentRequest &&
                  <Button onClick={this.onUnfriend} colored raised ripple className={styles.actionButton}>
                    Unfriend
                  </Button>
                }
                {!user.relationship.isFollow &&
                  <Button onClick={this.onFollow} colored raised ripple className={styles.actionButton}>
                    Follow
                  </Button>
                }
                {user.relationship.isFollow &&
                  <Button onClick={this.onUnfollow} colored raised ripple className={styles.actionButton}>
                    Unfollow
                  </Button>
                }
              </div>
            }

            <Tabs className={styles.profileTabs} activeTab={this.state.activeTab} onChange={tabId => this.setState({ activeTab: tabId })} ripple>
              <Tab>Timeline</Tab>
              <Tab>Trips</Tab>
              <Tab>Friends</Tab>
            </Tabs>
          </div>
        </div>

        {content}
      </div>
    );
  }
}
