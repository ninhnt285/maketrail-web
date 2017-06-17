import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Tabs, Tab, Grid, Cell, IconButton, Button, Menu, MenuItem } from 'react-mdl';

import LocalityFinder from 'components/LocalityFinder';
import Timeline from 'components/Timeline';
import AddTripLocalityMutation from 'mutations/TripLocality/AddTripLocalityMutation';
import UpdateTripMutation from 'mutations/Trip/UpdateTripMutation';

import TripLocality from './components/TripLocality';
import MemberManager from './components/MemberManager';
import styles from './Trip.scss';

export default class TripComponent extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    };

    this.onAddLocality = this.onAddLocality.bind(this);
    this.onPublishTrip = this.onPublishTrip.bind(this);
  }

  onAddLocality(localityId) {
    const addTripLocalityMutation = new AddTripLocalityMutation({
      tripId: this.props.viewer.Trip.id,
      localityId
    });

    Relay.Store.commitUpdate(
      addTripLocalityMutation
    );
  }

  onPublishTrip() {
    const updateTripMutation = new UpdateTripMutation({
      id: this.props.viewer.Trip.id,
      isPublished: true
    });

    Relay.Store.commitUpdate(
      updateTripMutation
    );
  }
  onInviteFriends() {
    window.FB.ui({
      method: 'send',
      link: window.location.href,
    });
  }
  render() {
    const { Trip } = this.props.viewer;
    const localities = Trip.localities.edges;

    let content = null;
    switch (this.state.activeTab) {
      case 0:
        content = (
          <Timeline
            className={styles.timeline}
            parentId={Trip.id}
          />
        );
        break;
      case 1:
        content = (
          <div>
            <LocalityFinder onAddLocality={this.onAddLocality} />
            <Grid className={styles.localities}>
              {localities.map(({ node }, index) => (
                <Cell key={node.id} col={12} tablet={8} phone={4}>
                  <TripLocality tripLocality={node} index={index} />
                </Cell>
              ))}
            </Grid>
          </div>
        );
        break;
      case 2:
        content = (
          <MemberManager
            tripId={Trip.id}
            members={Trip.members}
          />
        );
        break;
      default:
        content = null;
    }

    return (
      <div className={styles.root}>
        <div className={styles.tripCover}>
          {localities.length > 0 &&
            <div className={styles.videoContainer}>
              <iframe width='1280' height='720' src='https://www.youtube-nocookie.com/embed/3lx9n19PfE0?rel=0&amp;showinfo=0' frameBorder='0' />
            </div>
          }
          {localities.length === 0 &&
            <img src={Trip.previewPhotoUrl.replace('%s', '')} alt={Trip.name} />
          }
        </div>

        <div className={styles.tripDetail}>
          <h1>{Trip.name}</h1>
          <IconButton className={styles.settingBtn} name='settings' id='tripSettings' />
          <Menu target='tripSettings' align='right'>
            <MenuItem>Edit Name</MenuItem>
            <MenuItem>Export video</MenuItem>
            <MenuItem onClick={() => this.onInviteFriends()}>Invite friends</MenuItem>
          </Menu>
          {!Trip.isPublished &&
            <Button
              onClick={this.onPublishTrip}
              style={{ color: 'white', marginTop: '12px' }}
              raised colored ripple
            >
              Publish
            </Button>
          }
        </div>

        <Tabs className={styles.headerTab} activeTab={this.state.activeTab} onChange={tabId => this.setState({ activeTab: tabId })} ripple>
          <Tab>Timeline</Tab>
          <Tab>Plan</Tab>
          <Tab>Members</Tab>
        </Tabs>

        {content}
      </div>
    );
  }
}
