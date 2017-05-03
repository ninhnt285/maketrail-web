import React, { Component } from 'react';
import styles from './VenueRecommend.scss';

export default class VenueRecommend extends Component {
  render() {
    return (
      <div className={styles.recommend}>
        <span className={styles.title}>Recommend:</span>

        <span className={styles.recommendItem}>
          <img src='https://upload.wikimedia.org/wikipedia/en/a/a5/Liberty-statue-from-below_cropped.jpg' alt='Statue of Liberty' />
          <span>Statue of Liberty</span>
        </span>

        <span className={styles.recommendItem}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHMxAQ2ICRjsV3eHysaboyvh1Bsz3_kmoEg3W-S8WKwWubs0_7AmsfyJjBwPtl1vTPg8' alt='Time Square' />
          <span>Time Square</span>
        </span>

        <span className={styles.recommendItem}>
          <img src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTEDaZXYITG8ieFAPJ4YSUKCA4vK--tq6MNj5VD9zB4k1v_Iu7EypvKaYM89sDmWeppNao' alt='Central Park Zoo' />
          <span>Central Park Zoo</span>
        </span>
      </div>
    );
  }
}
