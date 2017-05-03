import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import styles from './LocalityVenue.scss';

class LocalityVenue extends Component {
  static propTypes = {
    localityVenue: PropTypes.object.isRequired
  };

  render() {
    const { localityVenue } = this.props;

    return (
      <div className={styles.root}>
        <img src={localityVenue.originVenue.previewPhotoUrl.replace('%s', '_50_square')} alt={localityVenue.originVenue.name} />
        <span>{localityVenue.originVenue.name}</span>
      </div>
    );
  }
}

export default Relay.createContainer(LocalityVenue, {
  fragments: {
    localityVenue: () => Relay.QL`
      fragment on LocalityVenue {
        id
        originVenue {
          id
          name
          address
          location {
            lat,
            lng
          }
          previewPhotoUrl
        }
      }
    `
  }
});
