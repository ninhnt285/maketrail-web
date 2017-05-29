import Relay from 'react-relay';
import Trips from './TripsComponent';

export default Relay.createContainer(Trips, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        allTrips (first: 100) {
          edges {
            node {
              id
              name
              previewPhotoUrl
            }
          }
        }
      }`
  }
});
