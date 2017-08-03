import Relay from 'react-relay';

class AnswerAddFriendMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {answerAddFriend}`;
  }

  getVariables() {
    return {
      userId: this.props.userId,
      choice: this.props.choice
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AnswerAddFriendPayload {
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
          fragment on AnswerAddFriendPayload {
            success
            errors
          }
        `]
      }
    ];
  }
}

export default AnswerAddFriendMutation;
