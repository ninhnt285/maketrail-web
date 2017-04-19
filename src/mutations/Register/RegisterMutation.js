import Relay from 'react-relay';

class RegisterMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {register}`;
  }

  getVariables() {
    return {
      fullName: this.props.fullName,
      username: this.props.username,
      email: this.props.email,
      password: this.props.password
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RegisterPayload {
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
          fragment on RegisterPayload {
            success
            accessToken
            errors
          }
        `]
      }
    ];
  }
}

export default RegisterMutation;
