import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

import Venue from './components/Venue';
import styles from './RecommendVenue.scss';

class RecommendVenue extends Component {
  static propTypes = {
    tripLocalityId: PropTypes.string.isRequired,
    venue: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { venue, tripLocalityId } = this.props;

    return (
      <div className={styles.root}>
        <Modal
          showModal={this.state.showModal}
          onCloseModal={this.hideModal}
          title='Information'
        >
          <Venue
            tripLocalityId={tripLocalityId}
            venue={venue}
            onCloseModal={this.hideModal}
          />
        </Modal>

        <button className={styles.recommendItem} onClick={this.showModal}>
          <img src={venue.previewPhotoUrl.replace('%s', '_50_square')} alt={venue.name} />
          <span>{venue.name}</span>
        </button>
      </div>
    );
  }
}

export default Relay.createContainer(RecommendVenue, {
  fragments: {
    venue: () => Relay.QL`
      fragment on Venue {
        id
        name
        address
        phone
        price
        rating
        previewPhotoUrl
      }
    `
  }
});
