import Relay from 'react-relay';
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
        }
      }
    `
  }
});
