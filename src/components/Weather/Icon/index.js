import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './WeatherIcon.scss';

export default class WeatherIcon extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <span
        {...this.props}
        className={`${styles[this.props.id]} ${styles.weatherIcon} ${this.props.className}`}
      />
    );
  }
}
