import Relay from 'react-relay';

import UserImageComponent from './UserImageComponent';

export default Relay.createContainer(UserImageComponent, {
  initialVariables: {
    userId: null,
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        User(id: $userId) {
          id
          profilePicUrl
        }
      }
    `
  }
});
