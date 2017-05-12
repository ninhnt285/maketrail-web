import Relay from 'react-relay';

class AddAttachmentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addAttachment}`;
  }

  getVariables() {
    return {};
  }

  getFiles() {
    return {
      file: this.props.file
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddAttachmentPayload {
        success
        errors
        attachment
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AddAttachmentPayload {
            success
            errors
            attachment {
              id
              name
              previewUrl
            }
          }
        `]
      }
    ];
  }
}

export default AddAttachmentMutation;
