import Relay from 'react-relay';

class InviteMemberMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {inviteMember}`;
  }

  getVariables() {
    const variables = {
      tripId: this.props.tripId
    };

    if (this.props.memberId) {
      variables.memberId = this.props.memberId;
    }

    if (this.props.email) {
      variables.email = this.props.email;
    }

    return variables;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on InviteMemberPayload {
        success
        errors
        edge
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: null,
        parentID: this.props.tripId,
        connectionName: 'members',
        edgeName: 'edge',
        rangeBehaviors: {
          '': 'append'
        }
      }
    ];
  }
}

export default InviteMemberMutation;
