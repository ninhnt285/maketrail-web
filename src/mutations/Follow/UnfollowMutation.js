import Relay from 'react-relay';

class UnfollowMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {unfollow}`;
  }

  getVariables() {
    return {
      userId: this.props.userId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UnfollowPayload {
        user {
          isFollowed
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

export default UnfollowMutation;
