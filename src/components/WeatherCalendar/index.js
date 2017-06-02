import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DayPicker } from 'react-dates';
import { Button } from 'react-mdl';
import 'react-dates/lib/css/_datepicker.css';

import UpdateTripLocalityMutation from 'mutations/TripLocality/UpdateTripLocalityMutation';

import WeatherColumn from './components/WeatherColumn';
import styles from './WeatherCalendar.scss';

export default class WeatherCalendar extends Component {
  static propTypes = {
    tripLocalityId: PropTypes.string.isRequired,
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
    this.submitArrivalTime = this.submitArrivalTime.bind(this);
  }

  onDateChange(date) {
    this.setState({ selectedDate: date });
  }

  getWeekTimeArr(selectedDate) {
    const date = selectedDate.clone();
    return [
      date.subtract(3, 'days').unix(),
      date.add(1, 'days').unix(),
      date.add(1, 'days').unix(),
      date.add(1, 'days').unix(),
      date.add(1, 'days').unix(),
      date.add(1, 'days').unix(),
      date.add(1, 'days').unix()
    ];
  }

  submitArrivalTime() {
    const updateTripLocalityMutation = new UpdateTripLocalityMutation({
      tripLocalityId: this.props.tripLocalityId,
      arrivalTime: this.state.selectedDate.unix()
    });

    Relay.Store.commitUpdate(updateTripLocalityMutation);
  }

  renderDay(day) {
    if (day.format('YYYY MM DD') === this.state.selectedDate.format('YYYY MM DD')) {
      return (<span className={styles.selectedDate}>{day.format('D')}</span>);
    }

    if (['0', '6'].indexOf(day.format('d').toString()) !== -1) {
      return (<span className={styles.weekEndDay}>{day.format('D')}</span>);
    }

    return day.format('D');
  }

  render() {
    const weekTime = this.getWeekTimeArr(this.state.selectedDate);
    const year = this.state.selectedDate.format('YYYY');

    return (
      <div className={styles.root}>
        <Button onClick={this.submitArrivalTime} raised colored style={{ color: '#FFF', float: 'right' }}>Save</Button>
        <div className='clearfix' />
        <DayPicker
          daySize={38}
          numberOfMonths={1}
          onDayClick={(date) => { this.onDateChange(date); }}
          isFocused
          renderDay={this.renderDay.bind(this)}
        />

        <h2 className={styles.title}>Historical weather</h2>

        <div className={styles.historicalWeather}>
          <div className={styles.weekColumn}>
            <div style={{ paddingTop: '20px' }} className={`${styles.dayBox} ${styles.weatherDay}`}>
              {year}
            </div>
            <div style={{ paddingTop: '20px' }} className={`${styles.dayBox} ${styles.weatherDay}`}>
              {year - 1}
            </div>
            <div style={{ paddingTop: '20px' }} className={`${styles.dayBox} ${styles.weatherDay}`}>
              {year - 2}
            </div>
            <div style={{ paddingTop: '20px' }} className={`${styles.dayBox} ${styles.weatherDay}`}>
              {year - 3}
            </div>
          </div>

          {weekTime.map(time =>
            <WeatherColumn
              key={time}
              location={this.props.location}
              time={time}
            />
          )}
        </div>
      </div>
    );
  }
}
