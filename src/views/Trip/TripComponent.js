import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Tabs, Tab, Grid, Cell, IconButton, Button, Menu, MenuItem, Textfield } from 'react-mdl';

import LocalityFinder from 'components/LocalityFinder';
import Timeline from 'components/Timeline';
import AddTripLocalityMutation from 'mutations/TripLocality/AddTripLocalityMutation';
import UpdateTripMutation from 'mutations/Trip/UpdateTripMutation';
import DeleteTripMutation from 'mutations/Trip/DeleteTripMutation';
import AddShareMutation from 'mutations/Feed/AddShareMutation';
import Modal from 'components/Modal';

import Map from './components/Map';
import TripLocality from './components/TripLocality';
import MediaManager from './components/MediaManager';
import Discussion from './components/Discussion';
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
      activeTab: 1,
      name: this.props.viewer.Trip.name,
      isInEditName: false,
      showShareModal: false,
      showMemberModal: false,
      textShare: '',
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
  onExportVideo(event) {
    event.preventDefault();
    const updateTripMutation = new UpdateTripMutation({
      id: this.props.viewer.Trip.id,
      exportedVideo: true,
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
        onSuccess: () => {
          this.context.router.goBack();
          return false;
        }
      }
    );
  }
  onShareFb() {
    window.FB.ui({
      method: 'share',
      href: window.location.href,
    });
  }
  onShare() {
    // const onShowFeed = ((this.props.parentId === null) || (this.props.parentId === this.props.userId));
    const addShareMutation = new AddShareMutation({
      parentId: this.props.viewer.Trip.id,
      text: this.state.textShare,
      onShowFeed: false,
    });

    Relay.Store.commitUpdate(addShareMutation, {
      onSuccess: () => {
        this.setState({ textShare: '', showShareModal: false });
      }
    });
  }
  onTextShareChange(event) {
    this.setState({ textShare: event.target.value });
  }
  handleTripNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }
  render() {
    const { Trip } = this.props.viewer;
    const localities = Trip.localities.edges;
    const members = Trip.members.edges;
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
                  <TripLocality tripLocality={node} index={index} tripId={Trip.id} />
                </Cell>
              ))}
            </Grid>
          </div>
        );
        break;
      case 2:
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
        <div className={styles.tripContent}>
          <div className={styles.tripCover}>
            {(this.state.activeTab === 0) &&
              <img src={Trip.previewPhotoUrl.replace('%s', '')} alt={Trip.name} />
            }
            {(this.state.activeTab === 2) &&
              <video controls className={styles.videoCover}>
                <source src={Trip.recentExportedVideo} type='video/mp4' />
                <div>Your browser does not support HTML5 video.</div>
              </video>
            }
            {(this.state.activeTab === 1) &&
              <Map tripId={Trip.id} localities={localities} />
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
              <MenuItem onClick={() => this.setState({ showShareModal: true })}>Share now</MenuItem>
              <MenuItem onClick={() => this.onShareFb()}>Share to Facebook</MenuItem>
              <Modal
                showModal={this.state.showShareModal}
                onCloseModal={() => this.setState({ showShareModal: false })}
                title='Share post'
              >
                <div style={{ width: '100%' }}>
                  <Textfield
                    value={this.state.textShare}
                    onChange={event => this.onTextShareChange(event)}
                    label="What's on your mind?"
                    rows={2}
                    style={{ width: '100%' }}
                  />
                  <div style={{ position: 'relative', width: '100%', display: 'block' }}>
                    <img style={{ width: '100%', height: 'auto' }}src={Trip.previewPhotoUrl.replace('%s', '')} alt='Trip Cover' />
                    <div style={{ margin: '0', padding: '10px', color: 'white', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.75)', bottom: '0', width: 'calc(100% - 20px)' }}>
                      {Trip.name}
                    </div>
                  </div>
                  <div className={styles.func}>
                    <Button style={{ marginTop: '10px', color: '#fff' }} colored raised ripple onClick={() => this.onShare()}>Submit</Button>
                    <Button style={{ marginTop: '10px', marginLeft: '10px', color: '#fff' }} raised ripple onClick={() => this.setState({ showShareModal: false })}>Cancel</Button>
                  </div>
                </div>
              </Modal>
              <MenuItem onClick={() => this.onEditTrip()}>Edit Name</MenuItem>
              <MenuItem onClick={event => this.onExportVideo(event)}>Export video</MenuItem>
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
            <Tab>Export Video</Tab>
          </Tabs>
          {content}
        </div>
        <div className={styles.leftColumn}>
          <Discussion tripId={Trip.id} members={members} />
        </div>
      </div>
    );
  }
}
