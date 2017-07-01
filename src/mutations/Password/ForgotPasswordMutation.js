import Relay from 'react-relay';

class ForgotPasswordMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {forgotPassword}`;
  }

  getVariables() {
    return {
      email: this.props.email
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ForgotPasswordPayload {
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
          fragment on ForgotPasswordPayload {
            success
            errors
          }
        `]
      }
    ];
  }
}

export default ForgotPasswordMutation;
