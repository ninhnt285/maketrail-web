import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DayPicker } from 'react-dates';

import WeatherIcon from 'components/WeatherIcon';
import 'react-dates/lib/css/_datepicker.css';

import styles from './WeatherCalendar.scss';

export default class WeatherCalendar extends Component {
  static propTypes = {
    // tripLocalityId: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    selectedDateUnix: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment.unix(this.props.selectedDateUnix)
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.renderDay = this.renderDay.bind(this);
  }

  onDateChange(date) {
    this.setState({ selectedDate: date });
    console.log(this.props.location.lat, this.props.location.lng);
  }

  renderDay(day) {
    if (day.format('YYYY MM DD') === this.state.selectedDate.format('YYYY MM DD')) {
      return (
        <span className={styles.selectedDate}>
          {day.format('D')}
        </span>
      );
    }

    if (['0', '6'].indexOf(day.format('d').toString()) !== -1) {
      return (
        <span className={styles.weekEndDay}>
          {day.format('D')}
        </span>
      );
    }
    return day.format('D');
  }

  render() {
    const years = [
      {
        year: 2017,
        days: [
          { name: 21, weather: 'rainy' },
          { name: 22, weather: 'sunny' },
          { name: 23, weather: 'snowy' },
          { name: 24, weather: 'cloudy' },
          { name: 25, weather: 'thunderstorm' },
          { name: 26, weather: 'shower' },
          { name: 27, weather: 'windy' },
        ]
      },
      {
        year: 2016,
        days: [
          { name: 18, weather: 'rainy' },
          { name: 19, weather: 'sunny' },
          { name: 20, weather: 'snowy' },
          { name: 21, weather: 'cloudy' },
          { name: 22, weather: 'thunderstorm' },
          { name: 23, weather: 'shower' },
          { name: 24, weather: 'windy' },
        ]
      }
    ];

    return (
      <div className={styles.root}>
        <DayPicker
          daySize={38}
          numberOfMonths={1}
          onDayClick={(date) => { this.onDateChange(date); }}
          isFocused
          renderDay={this.renderDay.bind(this)}
        />

        <h2 className={styles.title}>Historical weather</h2>

        {years.map(yearData =>
          <div key={yearData.year} className={styles.weekRow}>
            <div style={{ paddingTop: '20px' }} className={`${styles.dayBox} ${styles.weatherDay}`}>
              {yearData.year}
            </div>

            {yearData.days.map(node =>
              <div key={node.name} className={`${styles.dayBox} ${styles.weatherDay}`} style={{ backgroundColor: node.color }}>
                {node.name}<br />
                <WeatherIcon id={node.weather} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
