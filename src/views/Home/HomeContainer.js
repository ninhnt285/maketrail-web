import Relay from 'react-relay';
import Home from './HomeComponent';

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        user {
          id
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
