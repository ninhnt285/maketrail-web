import Relay from 'react-relay';

import City from './CityComponent';

export default Relay.createContainer(City, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  }
});
