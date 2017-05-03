import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import VenuesManager from 'components/VenuesManager';
import LocalityVenueManagerResult from 'components/VenuesManager/components/LocalityVenue';

import Locality from './components/Locality';
import LocalityVenue from './components/LocalityVenue';
import VenueRecommend from './components/VenueRecommend';
import CloneNote from './components/CloneNote';

import styles from './TripLocality.scss';

class TripLocality extends Component {
  static propTypes = {
    tripLocality: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.onOpenManager = this.onOpenManager.bind(this);
    this.onCloseManager = this.onCloseManager.bind(this);
  }

  onOpenManager() {
    this.setState({ showModal: true });
  }

  onCloseManager() {
    this.setState({ showModal: false });
  }

  render() {
    const localityVenues = this.props.tripLocality.localityVenues.edges;

    return (
      <div className={styles.root}>
        <Locality
          tripLocalityId={this.props.tripLocality.id}
          locality={this.props.tripLocality.originLocality}
          index={this.props.index}
        />

        <div className={styles.localityVenues}>
          <h4>Check-in Places</h4>
          <button onClick={this.onOpenManager} className={styles.manageButton}>Manage</button>
          <Modal
            showModal={this.state.showModal}
            onCloseModal={this.onCloseManager}
            title='Manage Places'
          >
            <VenuesManager
              tripLocalityId={this.props.tripLocality.id}
              localityId={this.props.tripLocality.originLocality.id}
              localityVenues={localityVenues}
            />
          </Modal>

          {localityVenues.map(({ node }) =>
            <LocalityVenue
              key={node.id}
              localityVenue={node}
            />
          )}

          {localityVenues.length === 0 &&
            <CloneNote />
          }

          <VenueRecommend />
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(TripLocality, {
  fragments: {
    tripLocality: () => Relay.QL`
      fragment on TripLocality {
        id
        originLocality {
          id
          ${Locality.getFragment('locality')}
        }
        localityVenues(first: 100) {
          edges {
            node {
              id
              ${LocalityVenue.getFragment('localityVenue')}
              ${LocalityVenueManagerResult.getFragment('localityVenue')}
            }
          }
        }
      }
    `
  }
});
