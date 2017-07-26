import Relay from 'react-relay';

import UserFullNameComponent from './UserFullNameComponent';

export default Relay.createContainer(UserFullNameComponent, {
  initialVariables: {
    userId: null,
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        User(id: $userId) {
          id
          fullName
        }
      }
    `
  }
});
