import Relay from 'react-relay';

class ChangePasswordMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {changePassword}`;
  }

  getVariables() {
    return {
      password: this.props.password,
      passwordNew: this.props.passwordNew,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ChangePasswordPayload {
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
          fragment on ChangePasswordPayload {
            success
            errors
            accessToken
          }
        `]
      }
    ];
  }
}

export default ChangePasswordMutation;
