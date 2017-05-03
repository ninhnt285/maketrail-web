import React, { Component } from 'react';
import Relay from 'react-relay';
import ViewerQuery from 'routes/ViewerQuery';
import LocalityFinder from './LocalityFinder';

export default class LocalityFinderRoot extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={LocalityFinder}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: {} }}
        renderFetched={data =>
          <LocalityFinder {...data} {...this.props} />
        }
      />
    );
  }
}
