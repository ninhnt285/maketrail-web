import Relay from 'react-relay';

class UpdateFeedMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {updateFeed}`;
  }

  getVariables() {
    const variables = {
      feedId: this.props.feedId,
      placeId: this.props.placeId,
      placeName: this.props.placeName,
      text: this.props.text,
      attachmentIds: this.props.attachmentIds,
    };
    return variables;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateFeedPayload {
        success
        errors
        feed {
          text
          placeId
          placeName
          attachments
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: { feed: this.props.feedId }
      }
    ];
  }
}

export default UpdateFeedMutation;
