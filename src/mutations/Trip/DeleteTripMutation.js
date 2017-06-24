import Relay from 'react-relay';

class DeleteTripMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {deleteTrip}`;
  }

  getVariables() {
    return {
      id: this.props.tripId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteTripPayload {
        deletedId
        viewer
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'viewer',
        parentID: 'viewer-fixed',
        connectionName: 'trip',
        deletedIDFieldName: 'deletedId',
      }
    ];
  }
}

export default DeleteTripMutation;
