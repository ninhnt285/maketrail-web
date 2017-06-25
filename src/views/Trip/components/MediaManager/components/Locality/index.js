import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Venue from './components/Venue';
import styles from './Locality.scss';

export default class Locality extends Component {
  static propTypes = {
    locality: PropTypes.object.isRequired
  };

  render() {
    const { locality } = this.props;
    const venues = [
      {
        id: '1',
        name: 'Venue 1',
        attachments: [
          { id: '1', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/1_150_square.jpg' },
          { id: '2', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/2_150_square.jpg' },
          { id: '3', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/3_150_square.jpg' },
          { id: '4', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/4_150_square.jpg' },
          { id: '5', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/5_150_square.jpg' },
          { id: '6', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/6_150_square.jpg' },
          { id: '7', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/7_150_square.jpg' },
          { id: '8', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/8_150_square.jpg' },
          { id: '9', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/9_150_square.jpg' },
          { id: '10', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/10_150_square.jpg' }
        ]
      },
      {
        id: '2',
        name: 'Venue 2',
        attachments: [
          { id: '6', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/6_150_square.jpg' },
          { id: '7', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/7_150_square.jpg' },
          { id: '8', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/8_150_square.jpg' },
          { id: '9', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/9_150_square.jpg' },
          { id: '10', photoPreviewUrl: 'http://static.maketrail.com/noImage/trip/10_150_square.jpg' }
        ]
      }
    ];

    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{locality.name}</h3>
        {venues.map(venue =>
          <Venue key={venue.id} venue={venue} />
        )}
      </div>
    );
  }
}
