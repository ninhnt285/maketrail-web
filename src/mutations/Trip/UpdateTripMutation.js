import Relay from 'react-relay';

class UpdateTripMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {updateTrip}`;
  }

  getVariables() {
    const variables = {
      id: this.props.id
    };

    if (this.props.name) {
      variables.name = this.props.name;
    }

    if (this.props.isPublished) {
      variables.isPublished = this.props.isPublished;
    }
    if (this.props.exportedVideo) {
      variables.exportedVideo = this.props.exportedVideo;
    }
    return variables;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTripPayload {
        success
        errors
        trip {
          name
          isPublished
          exportedVideo
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: { trip: this.props.id }
      }
    ];
  }
}

export default UpdateTripMutation;
