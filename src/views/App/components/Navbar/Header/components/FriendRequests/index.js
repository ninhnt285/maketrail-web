import React, { Component } from 'react';
import Relay from 'react-relay';
import ViewerQuery from 'routes/ViewerQuery';
import FriendRequests from './FriendRequests.js';

export default class FriendRequestsRoot extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={FriendRequests}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: {} }}
        renderFetched={data =>
          <FriendRequests {...data} {...this.props} />
        }
        renderLoading={() => (<span />)}
      />
    );
  }
}
