import Relay from 'react-relay';

import Profile from './ProfileComponent';
import Trip from './components/Trip';
import Friend from './components/Friend';

export default Relay.createContainer(Profile, {
  initialVariables: {
    userId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id
        }

        User(id: $userId) {
          id
          username
          fullName
          map
          relationship {
            isFriend
            isFollow
            isSentRequest
          }
          profilePicUrl
          mapAreas {
            code
            status
          }
          trips(first: 100) {
            edges {
              node {
                id
                ${Trip.getFragment('trip')}
              }
            }
          }
          friends(first: 100) {
            edges {
              node {
                id
                ${Friend.getFragment('user')}
              }
            }
          }
        }
      }
    `
  }
});
