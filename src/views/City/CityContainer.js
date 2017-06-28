import Relay from 'react-relay';
import City from './CityComponent';

export default Relay.createContainer(City, {
  initialVariables: {
    cityId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        Locality(id: $cityId) {
          id
          name
          description
          location {
            lat
            lng
          }
          previewPhotoUrl
        }
      }
    `
  }
});
