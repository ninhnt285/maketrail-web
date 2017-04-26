import Relay from 'react-relay';

class AddTripLocalityMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addTripLocality}`;
  }

  getVariables() {
    return {
      tripId: this.props.tripId,
      localityId: this.props.localityId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddTripLocalityPayload {
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
        parentID: this.props.tripId,
        connectionName: 'localities',
        edgeName: 'edge',
        rangeBehaviors: {
          '': 'append',
          'orderby(newest)': 'prepend'
        }
      }
    ];
  }
}

export default AddTripLocalityMutation;
