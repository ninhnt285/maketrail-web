import React from 'react';
import PropTypes from 'prop-types';
import LocalityFinder from '../Locality/FinderComponent';
import styles from './Trip.scss';
import coverPhoto from '../../assets/trip-cover/cover1.jpg';

export default class TripComponent extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.tripCover}>
          <img src={coverPhoto} alt='Trip Cover' />
          <h1>{this.props.viewer.Trip.name}</h1>
        </div>

        <LocalityFinder className={styles.localityFinder} />
      </div>
    );
  }
}
