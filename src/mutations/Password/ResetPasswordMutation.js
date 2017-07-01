import Relay from 'react-relay';

class ResetPasswordMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {resetPassword}`;
  }

  getVariables() {
    return {
      hash: this.props.hash,
      passwordNew: this.props.password
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ResetPasswordPayload {
        success
        errors
        accessToken
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on ResetPasswordPayload {
            success
            errors
            accessToken
          }
        `]
      }
    ];
  }
}

export default ResetPasswordMutation;
