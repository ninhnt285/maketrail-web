import Relay from 'react-relay';
import App from './AppComponent';

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        user {
          id
          username
          fullName
        }
      }`
  }
});
