import Relay from 'react-relay';

class LoginMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {login}`;
  }

  getVariables() {
    return {
      usernameOrEmail: this.props.usernameOrEmail,
      password: this.props.password
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LoginPayload {
        success,
        accessToken,
        errors
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on LoginPayload {
            success
            accessToken
            errors
          }
        `]
      }
    ];
  }
}

export default LoginMutation;
