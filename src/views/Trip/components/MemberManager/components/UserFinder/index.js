import React, { Component } from 'react';
import Relay from 'react-relay';

import ViewerQuery from 'routes/ViewerQuery';

import VenueFinder from './UserFinder';

export default class UserFinderRoot extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={VenueFinder}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: {} }}
        renderFetched={data =>
          <VenueFinder {...data} {...this.props} />
        }
      />
    );
  }
}
