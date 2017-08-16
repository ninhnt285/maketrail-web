import React, { Component } from 'react';
import Relay from 'react-relay';

import ViewerQuery from 'routes/ViewerQuery';

import MapContainer from './MapContainer';

export default class MapRoot extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={MapContainer}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: {} }}
        renderFetched={data =>
          <MapContainer {...data} {...this.props} />
        }
      />
    );
  }
}
