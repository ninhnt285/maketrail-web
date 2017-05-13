import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import ViewerQuery from 'routes/ViewerQuery';

import Timeline from './Timeline';

export default class TimelineRoot extends Component {
  static propTypes = {
    parentId: PropTypes.string
  };

  static defaultProps = {
    parentId: null
  };

  render() {
    return (
      <Relay.RootContainer
        Component={Timeline}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: { parentId: this.props.parentId } }}
        renderFetched={data =>
          <Timeline {...data} {...this.props} />
        }
      />
    );
  }
}
