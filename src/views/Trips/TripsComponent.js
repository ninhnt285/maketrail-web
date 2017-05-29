import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Button } from 'react-mdl';
import { Link } from 'react-router';

import AddTripMutation from 'mutations/Trip/AddTripMutation';

import styles from './Trips.scss';

export default class Trips extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  onAddTrip = (event) => {
    event.preventDefault();

    const title = 'Our Trip 2017';

    const addTripMutation = new AddTripMutation({
      title
    });

    Relay.Store.commitUpdate(
      addTripMutation,
      {
        onSuccess: (response) => {
          if (response.addTrip) {
            const addTripPayload = response.addTrip;
            if (addTripPayload.edge) {
              this.context.router.push(`/trip/${addTripPayload.edge.node.id}`);
            }
          }

          return false;
        }
      }
    );
  }

  render() {
    const trips = this.props.viewer.allTrips.edges;

    return (
      <div className={styles.root}>
        <Button onClick={this.onAddTrip} raised colored ripple style={{ color: '#EEE', margin: '0 0 15px', float: 'right' }}>New Trip</Button>
        <div style={{ clear: 'both' }} />
        <div className={styles.trips}>
          {trips.map(edge =>
            <Link key={edge.node.id} className={styles.trip} to={`/trip/${edge.node.id}`}>
              <img src={edge.node.previewPhotoUrl.replace('%s', '')} alt='Trip Cover' />
              <div className={styles.tripDetail}>
                <p>{edge.node.name}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  }
}
