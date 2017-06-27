import Relay from 'react-relay';

import Attachment from 'components/Attachment';

class AddAttachmentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addAttachment}`;
  }

  getVariables() {
    if (this.props.placeId) {
      return {
        placeId: this.props.placeId,
        placeName: this.props.placeName,
        parentId: this.props.parentId
      };
    }
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
        attachment {
          ${Attachment.getFragment('attachment')}
        }
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
              ${Attachment.getFragment('attachment')}
            }
          }
        `]
      }
    ];
  }
}

export default AddAttachmentMutation;
