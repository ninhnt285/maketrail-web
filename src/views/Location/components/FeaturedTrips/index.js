import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './FeaturedTrips.scss';

export default class FeaturedTrips extends Component {
  render() {
    const trips = [
      { id: '1', name: 'Trip 1', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/1%s.jpg' },
      { id: '2', name: 'Trip 2', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/2%s.jpg' },
      { id: '3', name: 'Trip 3', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/3%s.jpg' },
      { id: '4', name: 'Trip 4', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/4%s.jpg' }
    ];

    return (
      <div className={styles.root}>
        <h3 className={styles.title}>Featured Trips</h3>
        <div className={styles.content}>
          {trips.map(trip =>
            <div key={trip.id} className={styles.tripWrapper}>
              <img className={styles.tripCover} src={trip.previewPhotoUrl.replace('%s', '_500_square')} alt={trip.name} />
              <Link to={`/trip/${trip.id}`}>
                <h4 className={styles.tripTitle}>{trip.name}</h4>
              </Link>
              <i className={`material-icons ${styles.playBtn}`}>play_circle_filled</i>
            </div>
          )}
        </div>
      </div>
    );
  }
}
