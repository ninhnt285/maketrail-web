import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import styles from './Trip.scss';

class Trip extends Component {
  static propTypes = {
    trip: PropTypes.object.isRequired
  };

  render() {
    const { trip } = this.props;
    return (
      <div className={styles.root}>
        <Link to={`/trip/${trip.id}`}>
          <img className={styles.previewPhoto} src={trip.previewPhotoUrl.replace('%s', '')} alt={trip.name} />
          <div className={styles.content}>
            <h3 className={styles.title}>{trip.name}</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default Relay.createContainer(Trip, {
  fragments: {
    trip: () => Relay.QL`
      fragment on Trip {
        id
        name
        previewPhotoUrl
      }
    `
  }
});
