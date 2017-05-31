import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab } from 'react-mdl';

import Map from 'components/Map';
import Timeline from 'components/Timeline';
import FollowMutation from 'mutations/Follow/FollowMutation';

import styles from './Profile.scss';

export default class ProfileComponent extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    };

    this.onFollow = this.onFollow.bind(this);
  }

  onFollow() {
    const followMutation = new FollowMutation({
      userId: this.props.viewer.User.id
    });

    Relay.Store.commitUpdate(followMutation);
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
      default:
        content = null;
    }

    return (
      <div className={styles.root}>
        <div className={styles.profileCover}>
          <Map style={{ height: '300px' }} userId={user.id} />
          <div className={styles.timelineHeadline}>
            <div className={styles.userAvatar}>
              <img src={user.profilePicUrl.replace('%s', '_500_square')} alt={user.fullName} />
            </div>

            <div className={styles.actions}>
              {!user.isFollowed && (user.id !== me.id) &&
                <Button onClick={this.onFollow} colored raised ripple className={styles.addFriend}>Follow</Button>
              }
            </div>

            <Tabs className={styles.profileTabs} activeTab={this.state.activeTab} onChange={tabId => this.setState({ activeTab: tabId })} ripple>
              <Tab>Timeline</Tab>
              <Tab>Trips</Tab>
            </Tabs>
          </div>
        </div>

        {content}
      </div>
    );
  }
}
