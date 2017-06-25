import React, { Component } from 'react';

import Locality from './components/Locality';
import styles from './MediaManager.scss';

export default class MediaManager extends Component {
  render() {
    const localities = [
      {
        id: '0',
        name: 'Ha Noi',
        venues: []
      },
      {
        id: '1',
        name: 'Ninh Binh',
        venues: []
      }
    ];

    return (
      <div className={styles.root}>
        {localities.map(locality =>
          <Locality key={locality.id} locality={locality} />
        )}
      </div>
    );
  }
}
