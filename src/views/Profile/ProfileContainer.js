import Relay from 'react-relay';

import Profile from './ProfileComponent';

export default Relay.createContainer(Profile, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  }
});
