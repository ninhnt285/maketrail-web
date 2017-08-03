import Relay from 'react-relay';

class UnfriendMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {unfriend}`;
  }

  getVariables() {
    return {
      userId: this.props.userId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UnfriendPayload {
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

export default UnfriendMutation;
