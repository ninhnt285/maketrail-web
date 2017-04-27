import React, { Component } from 'react';
import VenueFinder from '../Venue/Finder';
import styles from './VenuesManager.scss';

export default class VenuesManager extends Component {
  render() {
    const todoItems = [
      {
        id: 'abc1',
        name: 'Statue of Liberty',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Liberty-statue-from-below_cropped.jpg'
      },
      {
        id: 'abc2',
        name: 'Central Park Zoo',
        imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTEDaZXYITG8ieFAPJ4YSUKCA4vK--tq6MNj5VD9zB4k1v_Iu7EypvKaYM89sDmWeppNao'
      },
      {
        id: 'abc3',
        name: 'Time Square',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHMxAQ2ICRjsV3eHysaboyvh1Bsz3_kmoEg3W-S8WKwWubs0_7AmsfyJjBwPtl1vTPg8'
      }
    ];

    return (
      <div className={styles.venuesManager}>
        <h1 className={styles.title}>Places Manager</h1>
        <div className={styles.content}>
          <VenueFinder />

          {todoItems.map(node =>
            <div key={node.id} className={styles.todoItem}>
              <img src={node.imageUrl} alt={node.name} />
              <span>{node.name}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}