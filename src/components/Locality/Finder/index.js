import React, { Component } from 'react';
import Relay from 'react-relay';
import ViewerQuery from '../../../routes/ViewerQuery';
import FinderContainer from './LocalityFinderContainer';

export default class LocalityFinder extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={FinderContainer}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: {} }}
        renderFetched={data =>
          <FinderContainer {...data} {...this.props} />
        }
      />
    );
  }
}
