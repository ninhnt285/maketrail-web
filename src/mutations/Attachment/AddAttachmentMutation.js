import Relay from 'react-relay';

class AddAttachmentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addAttachment}`;
  }

  getVariables() {
    console.log(this.props);
    if (this.props.placeId) {
      return {
        placeId: this.props.placeId,
        placeName: this.props.placeName,
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
          __typename
          ... on Photo {
            id
            name
            placeId
            placeName
            previewUrl
          }
          ... on Video {
            id
            placeId
            placeName
            name
            previewUrl
          }
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
              __typename
              ... on Photo {
                id
                name
                placeId
                placeName
                previewUrl
              }
              ... on Video {
                id
                name
                placeId
                placeName
                previewUrl
              }
            }
          }
        `]
      }
    ];
  }
}

export default AddAttachmentMutation;
