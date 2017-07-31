import Relay from 'react-relay';
import Attachment from 'components/Attachment';
import AttachmentComponent from './AttachmentComponent';

export default Relay.createContainer(AttachmentComponent, {
  initialVariables: {
    attachmentId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        Attachment(id: $attachmentId) {
          __typename
          ... on Photo {
            id
            name
            createdAt
            from {
              ... on User {
                id
                username
                fullName
                profilePicUrl
              }
            }
            isLiked
            statistics {
              likeCount
              commentCount
            }
          }

          ... on Video {
            id
            name
            createdAt
            from {
              ... on User {
                id
                username
                fullName
                profilePicUrl
              }
            }
            isLiked
            statistics {
              likeCount
              commentCount
            }
          }
          ${Attachment.getFragment('attachment')}
        }
      }
    `
  }
});
