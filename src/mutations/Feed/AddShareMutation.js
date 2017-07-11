import Relay from 'react-relay';

class AddShareMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addShare}`;
  }

  getVariables() {
    const variables = {
      parentId: this.props.parentId,
    };
    if (this.props.toId) {
      variables.toId = this.props.toId;
    }
    if (this.props.text) {
      variables.text = this.props.text;
    }
    return variables;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddSharePayload {
        success
        errors
        feed
        edge
      }
    `;
  }

  getConfigs() {
    // const rangeBehaviors = ({ toId }) => {
    //   if (toId === this.props.parentId) {
    //     return 'prepend';
    //   }
    //   return 'ignore';
    // };
    const rangeBehaviors = () => 'prepend';
    return [
      {
        type: 'RANGE_ADD',
        parentName: null,
        parentID: 'viewer-fixed',
        connectionName: 'allFeeds',
        edgeName: 'edge',
        rangeBehaviors
      }
    ];
  }
}

export default AddShareMutation;
