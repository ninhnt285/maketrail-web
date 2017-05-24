import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import ViewerQuery from 'routes/ViewerQuery';

import Map from './Map';

export default class MapRoot extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  render() {
    return (
      <Relay.RootContainer
        Component={Map}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: { userId: this.props.userId } }}
        renderFetched={data =>
          <Map {...data} {...this.props} />
        }
        renderLoading={() => (<span>Loading map...</span>)}
      />
    );
  }
}
