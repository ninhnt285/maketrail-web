import Relay from 'react-relay';

class UpdateTripLocalityMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {updateTripLocality}`;
  }

  getVariables() {
    const variables = {
      tripLocalityId: this.props.tripLocalityId
    };

    if (this.props.arrivalTime) {
      variables.arrivalTime = this.props.arrivalTime;
    }

    return variables;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTripLocalityPayload {
        success
        errors
        tripLocality {
          arrivalTime
          weatherIcon
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: { tripLocality: this.props.tripLocalityId }
      }
    ];
  }
}

export default UpdateTripLocalityMutation;
