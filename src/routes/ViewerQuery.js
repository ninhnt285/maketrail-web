import Relay from 'react-relay';

export default {
  viewer: (Component, vars) => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer', vars)}
      }
    }
  `
};
