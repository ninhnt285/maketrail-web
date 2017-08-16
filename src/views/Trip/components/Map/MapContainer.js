import Relay from 'react-relay';
import MapComponent from './MapComponent';

export default Relay.createContainer(MapComponent, {
  initialVariables: {
    lat: 0,
    lng: 0,
    search: false
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        searchGasStation(lat: $lat, lng: $lng) @include(if: $search){
          name
          lat
          lng
        }
        searchRestaurant(lat: $lat, lng: $lng) @include(if: $search){
          name
          lat
          lng
        }
      }
    `
  }
});
