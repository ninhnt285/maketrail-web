import Relay from 'react-relay';

class AnswerInviteMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {answerInvite}`;
  }

  getVariables() {
    return {
      notificationId: this.props.notificationId,
      choice: this.props.choice
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AnswerInvitePayload {
        success
        errors
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AnswerInvitePayload {
            success
            errors
          }
        `]
      }
    ];
  }
}

export default AnswerInviteMutation;
