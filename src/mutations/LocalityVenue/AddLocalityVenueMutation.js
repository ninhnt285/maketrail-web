import Relay from 'react-relay';

class AddLocalityVenueMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addLocalityVenue}`;
  }

  getVariables() {
    return {
      tripLocalityId: this.props.tripLocalityId,
      venueId: this.props.venueId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddLocalityVenuePayload {
        success
        errors
        edge
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: null,
        parentID: this.props.tripLocalityId,
        connectionName: 'localityVenues',
        edgeName: 'edge',
        rangeBehaviors: {
          '': 'append',
          'orderby(newest)': 'prepend'
        }
      }
    ];
  }
}

export default AddLocalityVenueMutation;
