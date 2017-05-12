import Relay from 'react-relay';

class AddFeedMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addFeed}`;
  }

  getVariables() {
    return {
      objectId: this.props.objectId,
      text: this.props.text,
      attachmentIds: this.props.attachmentIds
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddFeedPayload {
        success
        errors
        feed
        edge
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: null,
        parentID: this.props.objectId,
        connectionName: 'feeds',
        edgeName: 'edge',
        rangeBehaviors: {
          '': 'append',
          'orderby(newest)': 'prepend'
        }
      }
    ];
  }
}

export default AddFeedMutation;
