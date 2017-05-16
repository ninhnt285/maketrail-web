import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Tabs, Tab, Grid, Cell } from 'react-mdl';

import LocalityFinder from 'components/LocalityFinder';
import Timeline from 'components/Timeline';
import AddTripLocalityMutation from 'mutations/TripLocality/AddTripLocalityMutation';
import coverPhoto from 'assets/trip-cover/cover1.jpg';

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

  render() {
    const localities = this.props.viewer.Trip.localities.edges;

    let content = null;
    switch (this.state.activeTab) {
      case 0:
        content = (
          <Timeline
            parentId={this.props.viewer.Trip.id}
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
            tripId={this.props.viewer.Trip.id}
            members={this.props.viewer.Trip.members}
          />
        );
        break;
      default:
        content = null;
    }

    return (
      <div className={styles.root}>
        <div className={styles.tripCover}>
          <img src={coverPhoto} alt='Trip Cover' />
          <h1>{this.props.viewer.Trip.name}</h1>
        </div>

        <Tabs style={{ backgroundColor: '#FFF' }} activeTab={this.state.activeTab} onChange={tabId => this.setState({ activeTab: tabId })} ripple>
          <Tab>Timeline</Tab>
          <Tab>Plan</Tab>
          <Tab>Members</Tab>
          <Tab>Discuss</Tab>
        </Tabs>

        {content}
      </div>
    );
  }
}
