import Relay from 'react-relay';

class AddFriendMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addFriend}`;
  }

  getVariables() {
    return {
      userId: this.props.userId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddFriendPayload {
        success
        errors
        user
        edge
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AddFriendPayload {
            success
            errors
            user
          }
        `]
      }
    ];
  }
}

export default AddFriendMutation;
