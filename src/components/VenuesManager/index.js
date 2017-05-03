import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import VenueFinder from 'components/VenueFinder';
import AddLocalityVenueMutation from 'mutations/LocalityVenue/AddLocalityVenueMutation';

import LocalityVenue from './components/LocalityVenue';
import styles from './VenuesManager.scss';

export default class VenuesManager extends Component {
  static propTypes = {
    tripLocalityId: PropTypes.string.isRequired,
    localityId: PropTypes.string.isRequired,
    localityVenues: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);

    this.onAddVenue = this.onAddVenue.bind(this);
  }

  onAddVenue(venueId) {
    const addLocalityVenueMutation = new AddLocalityVenueMutation({
      tripLocalityId: this.props.tripLocalityId,
      venueId
    });

    Relay.Store.commitUpdate(
      addLocalityVenueMutation
    );
  }

  render() {
    const { localityVenues } = this.props;

    return (
      <div className={styles.venuesManager}>
        <VenueFinder
          localityId={this.props.localityId}
          onAddVenue={this.onAddVenue}
        />

        {localityVenues.map(({ node }) =>
          <LocalityVenue
            key={node.id}
            localityVenue={node}
          />
        )}
      </div>
    );
  }
}
