import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TripFinder from './components/TripFinder';
import styles from './Explore.scss';

export default class Explore extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  render() {
    // const { searchTrip } = this.props.viewer;
    const trips = [
      {
        id: '1',
        previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/1.jpg',
        name: 'Asean',
        cities: ['Hanoi', 'Tokyo', 'Seoul', 'Hanoi'],
        time: '5 days',
        cost: '$2000 - $3000 / person'
      },
      {
        id: '2',
        previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/3.jpg',
        name: 'Southeast Asean',
        cities: ['Hanoi', 'Saigon', 'Cambodia', 'Laos', 'Thailand', 'Malaysia', 'Singapore', 'Hanoi'],
        time: '14 days',
        cost: '$1200 - $2000 / person'
      }
    ];

    return (
      <div className={`${styles.root} clearfix`}>
        <div className={styles.leftColumn}>
          <TripFinder />
        </div>
        <div className={styles.content}>
          {trips.length > 0 &&
            trips.map(trip =>
              <div key={trip.id} className={styles.trip}>
                <img className={styles.previewImg} src={trip.previewPhotoUrl} alt={trip.name} />
                <div className={styles.tripContent}>
                  <h3 className={styles.tripTitle}>{trip.name}</h3>
                  <p className={styles.tripDetailRow}>
                    <span>Itinerary:</span> {trip.cities.join(', ')}
                  </p>
                  <p className={styles.tripDetailRow}>
                    <span>Total time:</span> {trip.time}
                  </p>
                  <p className={styles.tripDetailRow}>
                    <span>Cost:</span> {trip.cost}
                  </p>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
