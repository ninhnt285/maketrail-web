import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Button } from 'react-mdl';

import AddLocalityVenueMutation from 'mutations/LocalityVenue/AddLocalityVenueMutation';

import styles from './Venue.scss';

export default class Venue extends Component {
  static propTypes = {
    tripLocalityId: PropTypes.string.isRequired,
    venue: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onAddVenue = this.onAddVenue.bind(this);
  }

  onAddVenue() {
    const addLocalityVenueMutation = new AddLocalityVenueMutation({
      tripLocalityId: this.props.tripLocalityId,
      venueId: this.props.venue.id
    });

    Relay.Store.commitUpdate(addLocalityVenueMutation, {
      onSuccess: () => {
        this.props.onCloseModal();
      }
    });
  }

  render() {
    const { venue } = this.props;

    return (
      <div className={styles.root}>
        <img className={styles.previewPhoto} src={venue.previewPhotoUrl.replace('%s', '_500_square')} alt={venue.name} />
        <div className={styles.detail}>
          <h3 className={styles.title}>{venue.name}</h3>
          <p className={styles.description}>{venue.address}</p>

          <div className={styles.detailRow}>
            <h4>Phone</h4>
            <span>{venue.phone}</span>
          </div>

          <div className={styles.detailRow}>
            <h4>Price</h4>
            <span>{venue.price}</span>
          </div>

          <div className={styles.detailRow}>
            <h4>Score</h4>
            <span>{venue.rating}</span>
          </div>

          <Button
            className={styles.addButton}
            onClick={this.onAddVenue}
            colored
            raised
            ripple
          >
            Add
          </Button>

          <div className={styles.clear} />
        </div>
      </div>
    );
  }
}
