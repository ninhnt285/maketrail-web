import Relay from 'react-relay';

import Home from './HomeComponent';
import UserInfo from './components/UserInfo';

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id
          ${UserInfo.getFragment('user')}
          trips(first:10) {
            edges {
              node {
                id
                name
                previewPhotoUrl
              }
            }
          }
        }

        suggestFollows(first: 5) {
          edges {
            node {
              id
              username
              fullName
              profilePicUrl
              isFollowed
            }
          }
        }
      }
    `
  }
});
