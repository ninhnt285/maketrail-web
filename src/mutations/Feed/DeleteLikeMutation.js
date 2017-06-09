import Relay from 'react-relay';

class DeleteLikeMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {deleteLike}`;
  }

  getVariables() {
    return {
      parentId: this.props.parentId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteLikePayload {
        success
        viewer {
          Feed(id: "${this.props.parentId}") {
            isLiked
            statistics {
              likeCount
            }
          }
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: { viewer: 'viewer-fixed' },
      }
    ];
  }
}

export default DeleteLikeMutation;
