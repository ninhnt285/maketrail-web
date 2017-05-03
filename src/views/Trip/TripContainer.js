import Relay from 'react-relay';
import TripLocality from './components/TripLocality';
import Trip from './TripComponent';

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
