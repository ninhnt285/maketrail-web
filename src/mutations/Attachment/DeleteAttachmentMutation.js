import Relay from 'react-relay';

class DeleteAttachmentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {deleteAttachment}`;
  }

  getVariables() {
    return {
      id: this.props.attachmentId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteAttachmentPayload {
        deletedId
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        // parentName: 'viewer',
        // parentID: 'viewer-fixed',
        // connectionName: 'attachments',
        // deletedIDFieldName: 'deletedId',
      }
    ];
  }
}

export default DeleteAttachmentMutation;
