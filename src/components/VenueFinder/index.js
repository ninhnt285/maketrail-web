import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import ViewerQuery from 'routes/ViewerQuery';

import VenueFinder from './VenueFinder';

export default class VenueFinderRoot extends Component {
  static propTypes = {
    localityId: PropTypes.string.isRequired
  };

  render() {
    return (
      <Relay.RootContainer
        Component={VenueFinder}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: { localityId: this.props.localityId } }}
        renderFetched={data =>
          <VenueFinder {...data} {...this.props} />
        }
      />
    );
  }
}
