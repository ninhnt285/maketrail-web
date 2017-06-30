import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './FeaturedTrip.scss';

export default class FeaturedTrip extends Component {
  static propTypes = {
    trip: PropTypes.object.isRequired
  };

  render() {
    const { trip } = this.props;

    return (
      <div className={styles.tripWrapper}>
        <div className={styles.tripCover}>
          <img src={trip.previewPhotoUrl.replace('%s', '_500_square')} alt={trip.name} />
          <i className={`material-icons ${styles.playBtn}`}>play_circle_filled</i>
        </div>
        <div className={styles.tripContent}>
          <h3 className={styles.tripName}>{trip.name}</h3>
          <div className={styles.tripBottom}>
            <div className={styles.tripLeft}>
              Asia
            </div>
            <div className={styles.tripRight}>
              Relax
            </div>
          </div>
        </div>
      </div>
    );
  }
}
