import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import LocalityFinder from '../Locality/Finder';
import styles from './Trip.scss';
import coverPhoto from '../../assets/trip-cover/cover1.jpg';
import AddLocalityMutation from '../../mutations/Locality/AddLocalityMutation';

export default class TripComponent extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.onAddLocality = this.onAddLocality.bind(this);
  }

  onAddLocality(localityId) {
    const addLocalityMutation = new AddLocalityMutation({
      tripId: this.props.viewer.Trip.id,
      localityId
    });

    Relay.Store.commitUpdate(
      addLocalityMutation
    );
  }

  render() {
    const localities = this.props.viewer.Trip.localities.edges;

    return (
      <div className={styles.root}>
        <div className={styles.tripCover}>
          <img src={coverPhoto} alt='Trip Cover' />
          <h1>{this.props.viewer.Trip.name}</h1>
        </div>

        <LocalityFinder onAddLocality={this.onAddLocality} />

        {(localities.length > 0) &&
          <div>
            {localities.map(edge =>
              <div key={edge.node.id}>
                <p>{edge.node.name}</p>
              </div>
            )}
          </div>
        }
      </div>
    );
  }
}
