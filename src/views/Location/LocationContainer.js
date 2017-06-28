import Relay from 'react-relay';

import Location from './LocationComponent';

export default Relay.createContainer(Location, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  }
});
