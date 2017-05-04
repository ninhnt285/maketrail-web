import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Tabs, Tab, Grid, Cell } from 'react-mdl';

import LocalityFinder from 'components/LocalityFinder';
import AddTripLocalityMutation from 'mutations/TripLocality/AddTripLocalityMutation';
import coverPhoto from 'assets/trip-cover/cover1.jpg';

import TripLocality from './components/TripLocality';
import styles from './Trip.scss';

export default class TripComponent extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1
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
    if (this.state.activeTab === 1) {
      content = (
        <div>
          <LocalityFinder onAddLocality={this.onAddLocality} />
          <Grid className={styles.localities}>
            {localities.map(({ node }, index) => (
              <Cell key={node.id} col={6} tablet={8} phone={4}>
                <TripLocality tripLocality={node} index={index} />
              </Cell>
            ))}
          </Grid>
        </div>
      );
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