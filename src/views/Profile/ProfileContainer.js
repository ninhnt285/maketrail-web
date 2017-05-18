import Relay from 'react-relay';

import Profile from './ProfileComponent';

export default Relay.createContainer(Profile, {
  initialVariables: {
    userId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        User(id: $userId) {
          id
          fullName
        }
      }
    `
  }
});
