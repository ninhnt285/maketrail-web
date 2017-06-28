import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './FeaturedLocations.scss';

export default class FeaturedLocations extends Component {
  render() {
    const locations = [
      { id: '1', name: 'Location 1', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/1%s.jpg' },
      { id: '2', name: 'Location 2', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/2%s.jpg' },
      { id: '3', name: 'Location 3', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/3%s.jpg' },
      { id: '4', name: 'Location 4', previewPhotoUrl: 'http://static.maketrail.com/noImage/trip/4%s.jpg' }
    ];

    return (
      <div className={styles.root}>
        <h3 className={styles.title}>Most Visited Locations</h3>
        <div className={styles.content}>
          {locations.map(location =>
            <div key={location.id} className={styles.locationWrapper}>
              <img className={styles.locationCover} src={location.previewPhotoUrl.replace('%s', '_500_square')} alt={location.name} />
              <Link to={`/location/${location.id}`}>
                <h4 className={styles.locationTitle}>{location.name}</h4>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
