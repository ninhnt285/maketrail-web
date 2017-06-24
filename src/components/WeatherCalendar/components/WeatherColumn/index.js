import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import ViewerQuery from 'routes/ViewerQuery';

import WeatherColumn from './WeatherColumn';

export default class WeatherColumnRoot extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    time: PropTypes.number.isRequired,
  };
  render() {
    return (
      <Relay.RootContainer
        Component={WeatherColumn}
        route={{
          queries: ViewerQuery,
          name: 'ViewerQuery',
          params: {
            time: this.props.time,
            lat: this.props.location.lat,
            lng: this.props.location.lng,
          }
        }}
        renderFetched={data =>
          <WeatherColumn {...data} {...this.props} />
        }
        renderLoading={() => (<span>...</span>)}
      />
    );
  }
}
