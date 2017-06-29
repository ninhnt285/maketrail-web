import Relay from 'react-relay';

class UpdateUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {updateInfo}`;
  }

  getVariables() {
    const variables = {};
    if (this.props.fullName) {
      variables.fullName = this.props.fullName;
    }
    if (this.props.profilePicUrl) {
      variables.profilePicUrl = this.props.profilePicUrl;
    }

    return variables;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateUserPayload {
        success
        errors
        user {
          profilePicUrl
          fullName
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: { user: null }
      }
    ];
  }
}

export default UpdateUserMutation;
