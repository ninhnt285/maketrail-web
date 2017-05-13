import Relay from 'react-relay';

class AddFeedMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addFeed}`;
  }

  getVariables() {
    return {
      objectId: this.props.parentId,
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
    const rangeBehaviors = ({ parentId }) => {
      if (parentId === this.props.parentId) {
        return 'prepend';
      }

      return 'ignore';
    };

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

export default AddFeedMutation;
