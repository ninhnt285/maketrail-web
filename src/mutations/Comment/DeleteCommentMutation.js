import Relay from 'react-relay';

class DeleteCommentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {deleteComment}`;
  }

  getVariables() {
    return {
      id: this.props.commentId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteCommentPayload {
        deletedId
        viewer {
          allComments(first: 100, parentId: "${this.props.parentId}") {
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
        connectionName: 'allComments',
        deletedIDFieldName: 'deletedId',
      }
    ];
  }
}

export default DeleteCommentMutation;
