import React, { Component } from 'react';
import Relay from 'react-relay';
import ViewerQuery from '../../../routes/ViewerQuery';
import LocalityFinderContent from './LocalityFinder';

export default class LocalityFinder extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={LocalityFinderContent}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: {} }}
        renderFetched={data =>
          <LocalityFinderContent {...data} {...this.props} />
        }
      />
    );
  }
}
