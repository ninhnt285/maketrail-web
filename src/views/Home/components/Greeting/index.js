import React from 'react';

import coverImage from 'assets/slide01.jpg';

import FeaturedTrip from './components/FeaturedTrip';
import styles from './Greeting.scss';

export default class GreetingComponent extends React.Component {
  render() {
    const trips = [
      { id: '1', name: 'Trip 1', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/1%s.jpg' },
      { id: '2', name: 'Trip 2', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/2%s.jpg' },
      { id: '3', name: 'Trip 3', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/3%s.jpg' },
      { id: '4', name: 'Trip 4', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/4%s.jpg' },
      { id: '5', name: 'Trip 5', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/5%s.jpg' },
      { id: '6', name: 'Trip 6', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/6%s.jpg' },
    ];

    return (
      <div className={styles.root}>
        <img className={styles.coverImage} src={coverImage} alt='MakeTrail' />
        <div className={styles.content}>
          <div className={styles.featuredTrips}>
            <h3 style={{ textAlign: 'center', margin: 0, fontSize: '26px' }}>Featured Trips</h3>
            {trips.map(trip =>
              <FeaturedTrip key={trip.id} trip={trip} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
