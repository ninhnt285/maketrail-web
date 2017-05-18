import Relay from 'react-relay';

import PhotosComponent from './PhotosComponent';

export default Relay.createContainer(PhotosComponent, {
  initialVariables: {
    userId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        User(id: $userId) {
          id
          fullName
        }
      }
    `
  }
});
