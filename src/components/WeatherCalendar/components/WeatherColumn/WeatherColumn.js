import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import moment from 'moment';

import WeatherIcon from 'components/WeatherIcon';

import styles from './WeatherColumn.scss';

class WeatherColumn extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    onLoaded: PropTypes.func,
  };
  static defaultProps = {
    onLoaded: null
  }
  componentDidMount() {
    if (typeof this.props.onLoaded === 'function') {
      const results = this.props.viewer.Weather.data;
      this.props.onLoaded(results[0].icon);
    }
  }
  render() {
    const results = this.props.viewer.Weather.data;
    return (
      <div className={styles.root}>
        {results.length > 0 &&
          results.map(weatherDay =>
            <div key={weatherDay.time} className={`${styles.dayBox} ${styles.weatherDay}`}>
              {moment.unix(weatherDay.time).format('DD')}<br />
              <WeatherIcon id={weatherDay.icon} />
            </div>
          )
        }
      </div>
    );
  }
}

export default Relay.createContainer(WeatherColumn, {
  initialVariables: {
    time: 0,
    lat: 0,
    lng: 0
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        Weather(time: $time, lat: $lat, lng: $lng) {
          data {
            time
            icon
            summary
            temperatureMin
            temperatureMax
            visibility
          }
        }
      }
    `
  }
});
