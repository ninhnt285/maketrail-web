import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import styles from './Locality.scss';

class Locality extends Component {
  static propTypes = {
    locality: PropTypes.object.isRequired
  };

  render() {
    const { locality } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <img
            className={styles.previewPhoto}
            src={`${locality.previewPhotoUrl.replace('%s', '_150_square')}`}
            alt={locality.name}
          />
          <div className={styles.detail}>
            <h3>{locality.name}</h3>
            <p>{locality.description}</p>
          </div>
        </div>
        <div className={styles.content}>
          {locality.id}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Locality, {
  fragments: {
    locality: () => Relay.QL`
      fragment on Locality {
        id
        name
        description
        location {
          lat
          lng
        }
        previewPhotoUrl
      }
    `
  }
});
