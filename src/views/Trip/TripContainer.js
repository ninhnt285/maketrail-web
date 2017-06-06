import Relay from 'react-relay';

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
                ${TripLocality.getFragment('tripLocality')}
              }
            }
          }
        }
      }
    `
  }
});
