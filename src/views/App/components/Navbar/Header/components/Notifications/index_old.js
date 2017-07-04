import React, { Component } from 'react';
import Relay from 'react-relay';
import ViewerQuery from 'routes/ViewerQuery';
import Notifications from './Notifications.js';

export default class NotificationsRoot extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={Notifications}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: {} }}
        renderFetched={data =>
          <Notifications {...data} {...this.props} />
        }
        renderLoading={() => (<span />)}
      />
    );
  }
}
