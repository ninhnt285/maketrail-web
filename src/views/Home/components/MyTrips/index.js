import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { extendClassName } from 'libs/component';

import styles from './MyTrips.scss';

export default class MyTrips extends Component {
  static propTypes = {
    trips: PropTypes.array.isRequired
  };

  render() {
    const { trips } = this.props;
    const className = extendClassName(this.props, styles.root);

    let content = (
      <div className={styles.content}>
        <p>You do not have any trips.</p>
      </div>
    );
    if (trips.length > 0) {
      const trip = trips[0].node;
      content = (
        <div className={styles.content}>
          <img className={styles.tripPreview} src={trip.previewPhotoUrl.replace('%s', '_250')} alt={trip.name} />
          <p className={styles.tripName}>
            <Link to={`/trip/${trip.id}`}>{trip.name}</Link>
          </p>
        </div>
      );
    }

    return (
      <div className={`${className} clearfix`}>
        <button className={styles.addBtn}>
          <i className='material-icons'>add</i>
        </button>
        <h3 className={styles.title}>My Trips</h3>
        {content}
        <Link style={{ float: 'right' }} to='/trips'>View all</Link>
      </div>
    );
  }
}
