import Relay from 'react-relay';

class FollowMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {follow}`;
  }

  getVariables() {
    return {
      userId: this.props.userId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on FollowPayload {
        user {
          relationship {
            isFollow
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

export default FollowMutation;
