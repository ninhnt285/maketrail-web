import Relay from 'react-relay';

class RemoveTripLocalityMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {removeTripLocality}`;
  }

  getVariables() {
    return {
      tripId: this.props.tripId,
      tripLocalityId: this.props.tripLocalityId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveTripLocalityPayload {
        deletedId
        viewer {
          Trip(id: "${this.props.tripId}") {
            localities(first: 100) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'viewer',
        parentID: 'viewer-fixed',
        connectionName: 'localities',
        deletedIDFieldName: 'deletedId',
      }
    ];
  }
}

export default RemoveTripLocalityMutation;
