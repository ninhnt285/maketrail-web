import Relay from 'react-relay';

import Profile from './ProfileComponent';

export default Relay.createContainer(Profile, {
  initialVariables: {
    userId: null,
    mapId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        User(id: $userId) {
          id
          fullName
        }
        mapAreas(id: $mapId, userId: $userId) {
          code
          name
          status
        }
      }
    `
  }
});
