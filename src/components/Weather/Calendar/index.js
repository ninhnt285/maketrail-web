import React, { Component } from 'react';
import styles from './WeatherCalendar.scss';
import WeatherIcon from '../Icon';

export default class WeatherCalendar extends Component {
  render() {
    const dayNames = [
      { name: 'Mon', color: '#FFF' },
      { name: 'Tue', color: '#FFF' },
      { name: 'Web', color: '#FFF' },
      { name: 'Thu', color: '#FFF' },
      { name: 'Fri', color: '#FFF' },
      { name: 'Sat', color: '#F00' },
      { name: 'Sun', color: '#F00' },
    ];

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
        <div className={styles.weekRow}>
          <div className={styles.dayBox} />
          {dayNames.map(node =>
            <div key={node.name} className={styles.dayBox} style={{ backgroundColor: node.color }}>
              {node.name}
            </div>
          )}
        </div>

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
