import Relay from 'react-relay';

class UpdateCommentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {updateComment}`;
  }

  getVariables() {
    return {
      id: this.props.commentId,
      text: this.props.text,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateCommentPayload {
        success
        errors
        comment {
          text
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: { comment: this.props.commentId }
      }
    ];
  }
}

export default UpdateCommentMutation;
