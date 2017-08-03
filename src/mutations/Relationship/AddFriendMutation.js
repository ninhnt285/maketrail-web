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
        user {
          relationship {
            isFriend
            isSentRequest
          }
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          user: this.props.userId
        }
      }
    ];
  }
}

export default AddFriendMutation;
