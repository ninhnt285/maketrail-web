import Relay from 'react-relay';

class AddLikeMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addLike}`;
  }

  getVariables() {
    return {
      parentId: this.props.parentId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddLikePayload {
        success
        errors
        like
        edge
      }
    `;
  }

  getConfigs() {
    const rangeBehaviors = ({ parentId }) => {
      if (parentId === this.props.parentId) {
        return 'prepend';
      }

      return 'ignore';
    };

    return [
      {
        type: 'RANGE_ADD',
        parentName: null,
        parentID: 'viewer-fixed',
        connectionName: 'statistics',
        edgeName: 'edge',
        rangeBehaviors
      }
    ];
  }
}

export default AddLikeMutation;
