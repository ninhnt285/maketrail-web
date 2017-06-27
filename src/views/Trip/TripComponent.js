import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Tabs, Tab, Grid, Cell, IconButton, Button, Menu, MenuItem } from 'react-mdl';

import LocalityFinder from 'components/LocalityFinder';
import Timeline from 'components/Timeline';
import AddTripLocalityMutation from 'mutations/TripLocality/AddTripLocalityMutation';
import UpdateTripMutation from 'mutations/Trip/UpdateTripMutation';
import DeleteTripMutation from 'mutations/Trip/DeleteTripMutation';

import TripLocality from './components/TripLocality';
import MemberManager from './components/MemberManager';
import MediaManager from './components/MediaManager';
import styles from './Trip.scss';

export default class TripComponent extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      name: this.props.viewer.Trip.name,
      isInEditName: (this.props.viewer.Trip.name === 'Our Trip 2017'),
    };

    this.onAddLocality = this.onAddLocality.bind(this);
    this.onPublishTrip = this.onPublishTrip.bind(this);
    this.onEditTripSubmit = this.onEditTripSubmit.bind(this);
    this.onDeleteTrip = this.onDeleteTrip.bind(this);
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

  onEditTripSubmit(event) {
    event.preventDefault();
    if (this.state.name === this.props.viewer.Trip.name) {
      return;
    }
    const updateTripMutation = new UpdateTripMutation({
      id: this.props.viewer.Trip.id,
      name: this.state.name,
    });

    Relay.Store.commitUpdate(
      updateTripMutation,
      {
        onSuccess: () => {
          this.setState({ isInEditName: false });
          // this.nameInput.blur();
          return false;
        }
      }
    );
  }

  onInviteFriends() {
    window.FB.ui({
      method: 'send',
      link: window.location.href,
    });
  }
  onEditTrip() {
    // this.setState({ isInEditName: true });
    this.nameInput.focus();
  }
  onDeleteTrip() {
    const deleteTripMutation = new DeleteTripMutation({
      tripId: this.props.viewer.Trip.id,
    });

    Relay.Store.commitUpdate(
      deleteTripMutation,
      {
        onSuccess: (response) => {
          this.context.router.goBack();
          return false;
        }
      }
    );
  }
  handleTripNameChange = (event) => {
    this.setState({
      name: event.target.value,
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
            places={Trip.allPlaces}
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
      case 3:
        content = (
          <MediaManager
            attachments={Trip.allAttachments}
            localities={Trip.localities.edges}
            tripId={Trip.id}
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
          <form onSubmit={this.onEditTripSubmit}>
            <input
              onChange={this.handleTripNameChange}
              onBlur={this.onEditTripSubmit}
              label='Name'
              className={styles.nameTrip}
              value={this.state.name}
              ref={(input) => { this.nameInput = input; }}
              autoFocus={this.state.isInEditName}
            />
          </form>
          <IconButton className={styles.settingBtn} name='settings' id='tripSettings' />
          <Menu target='tripSettings' align='right'>
            <MenuItem onClick={() => this.onEditTrip()}>Edit Name</MenuItem>
            <MenuItem>Export video</MenuItem>
            <MenuItem onClick={() => this.onInviteFriends()}>Invite friends</MenuItem>
            <MenuItem onClick={this.onDeleteTrip}>Delete</MenuItem>
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
          <Tab>Photos/Videos</Tab>
        </Tabs>

        {content}
      </div>
    );
  }
}
