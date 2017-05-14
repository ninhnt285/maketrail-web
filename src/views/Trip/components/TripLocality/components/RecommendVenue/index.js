import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import styles from './RecommendVenue.scss';

class RecommendVenue extends Component {
  static propTypes = {
    venue: PropTypes.object.isRequired
  };

  render() {
    const venue = this.props.venue;

    return (
      <span className={styles.recommendItem}>
        <img src={venue.previewPhotoUrl.replace('%s', '_50_square')} alt={venue.name} />
        <span>{venue.name}</span>
      </span>
    );
  }
}

export default Relay.createContainer(RecommendVenue, {
  fragments: {
    venue: () => Relay.QL`
      fragment on Venue {
        id
        name
        previewPhotoUrl
      }
    `
  }
});
