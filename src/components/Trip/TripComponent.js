import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-mdl';
import LocalityFinder from '../Locality/Finder';
import styles from './Trip.scss';
import coverPhoto from '../../assets/trip-cover/cover1.jpg';
import AddLocalityMutation from '../../mutations/Locality/AddLocalityMutation';
import TripLocality from '../TripLocality';

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
    const addLocalityMutation = new AddLocalityMutation({
      tripId: this.props.viewer.Trip.id,
      localityId
    });

    Relay.Store.commitUpdate(
      addLocalityMutation
    );
  }

  render() {
    const localities = this.props.viewer.Trip.localities.edges;

    let content = null;
    if (this.state.activeTab === 1) {
      content = (
        <div>
          <LocalityFinder onAddLocality={this.onAddLocality} />
          <div className={styles.localities}>
            {localities.map(({ node }) => (
              <TripLocality key={node.id} tripLocality={node} />
            ))}
          </div>
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
        </Tabs>

        {content}
      </div>
    );
  }
}
