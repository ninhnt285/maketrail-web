import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import coverPhoto from 'assets/trip-cover/cover2.jpg';

import styles from './MyTrips.scss';

export default class MyTrips extends Component {
  static propTypes = {
    trips: PropTypes.array.isRequired
  };

  render() {
    const { trips } = this.props;
    if (trips.length === 0) {
      return (
        <div className={styles.root}>
          <h3 className={styles.title}>My Trips</h3>
          <div className={styles.content}>
            <p>You do not have any trip. <Link to='/trips'>Create</Link> new trip.</p>
          </div>
        </div>
      );
    }

    const trip = trips[0].node;
    return (
      <div className={`${styles.root} clearfix`}>
        <h3 className={styles.title}>My Trips</h3>
        <div className={styles.content}>
          <img className={styles.tripPreview} src={coverPhoto} alt={trip.name} />
          <p className={styles.tripName}>
            <Link to={`/trip/${trip.id}`}>{trip.name}</Link>
          </p>
        </div>
        <Link style={{ float: 'right' }} to='/trips'>View all</Link>
      </div>
    );
  }
}
