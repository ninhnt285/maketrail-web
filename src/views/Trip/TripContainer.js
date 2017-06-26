import Relay from 'react-relay';

import Attachment from 'components/Attachment';

import Trip from './TripComponent';
import TripLocality from './components/TripLocality';
import Member from './components/MemberManager/components/Member';

export default Relay.createContainer(Trip, {
  initialVariables: {
    tripId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        Trip(id: $tripId) {
          id
          name
          isPublished
          previewPhotoUrl
          members(first: 10) {
            edges {
              node {
                id
                ${Member.getFragment('user')}
              }
            }
          }
          localities(first: 10) {
            edges {
              node {
                id
                originLocality {
                  id
                  name
                }
                localityVenues(first: 100) {
                  edges {
                    node {
                      id
                      originVenue {
                        id
                        name
                      }
                    }
                  }
                }
                ${TripLocality.getFragment('tripLocality')}
              }
            }
          }
          allPlaces {
            __typename
            ... on Locality {
              id
              name
              previewPhotoUrl
            }
            ... on Venue {
              id
              name
              previewPhotoUrl
            }
          }
          allAttachments {
            ... on Photo {
              id
              placeId
            }
            ... on Video {
              id
              placeId
            }
            ${Attachment.getFragment('attachment')}
          }
        }
      }
    `
  }
});
