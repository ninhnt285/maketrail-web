import Relay from 'react-relay';

class AddCommentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addComment}`;
  }

  getVariables() {
    return {
      parentId: this.props.parentId,
      text: this.props.text
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddCommentPayload {
        success
        errors
        comment
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
        connectionName: 'allComments',
        edgeName: 'edge',
        rangeBehaviors
      }
    ];
  }
}

export default AddCommentMutation;
