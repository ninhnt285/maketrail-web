import Relay from 'react-relay';

import Setting from './SettingComponent';

export default Relay.createContainer(Setting, {

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id
          fullName
        }
      }
    `
  }
});
