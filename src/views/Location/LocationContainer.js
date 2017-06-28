import Relay from 'react-relay';

import Location from './LocationComponent';

export default Relay.createContainer(Location, {
  initialVariables: {
    locationId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        Venue(id: $locationId) {
          id
          name
          address
          location {
            lat
            lng
          }
          previewPhotoUrl
          rating
          price
          phone
        }
      }
    `
  }
});
