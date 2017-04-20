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
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AddTripPayload {
            success
            errors
            trip
          }
        `]
      }
    ];
  }
}

export default AddTripMutation;
