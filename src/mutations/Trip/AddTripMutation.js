import Relay from 'react-relay';

class AddTripMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addTrip}`;
  }

  getVariables() {
    return {
      name: this.props.title
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddTripPayload {
        success
        errors
        trip
        edge
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: null,
        parentID: 'viewer-fixed',
        connectionName: 'allTrips',
        edgeName: 'edge',
        rangeBehaviors: {
          '': 'append'
        }
      }
    ];
  }
}

export default AddTripMutation;
