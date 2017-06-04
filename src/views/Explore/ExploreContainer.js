import Relay from 'react-relay';

import Explore from './ExploreComponent';

export default Relay.createContainer(Explore, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        searchTrip(first: 10) {
          edges {
            node {
              id
              name
              previewPhotoUrl
            }
          }
        }
      }
    `
  }
});
