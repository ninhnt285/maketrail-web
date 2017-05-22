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
        allTrips(first:1) {
          edges {
            node {
              id
              name
            }
          }
        }
      }`
  }
});
