import Relay from 'react-relay';

class DeleteFeedMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {deleteFeed}`;
  }

  getVariables() {
    return {
      feedId: this.props.feedId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteFeedPayload {
        deletedId
        viewer {
          allFeeds(first: 100, toId: "${this.props.parentId}") {
            edges {
              node {
                id
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
        connectionName: 'allFeeds',
        deletedIDFieldName: 'deletedId',
      }
    ];
  }
}

export default DeleteFeedMutation;
