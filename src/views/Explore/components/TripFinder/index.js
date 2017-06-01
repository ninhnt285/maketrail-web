import React, { Component } from 'react';
import { Icon } from 'react-mdl';

import styles from './TripFinder.scss';

export default class TripFinder extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.row}>
          <h3 className={styles.title}>Categories:</h3>
          <div className={styles.detail}>
            <Icon name='pool' />
            <Icon name='restaurant' />
            <Icon name='local_florist' />
            <Icon name='local_see' />
            <Icon name='terrain' />
            <Icon className={styles.addIcon} name='add' />
          </div>
        </div>

        <div className={styles.row}>
          <h3 className={styles.title}>Transportations:</h3>
          <div className={styles.detail}>
            <Icon name='directions_bike' />
            <Icon name='directions_boat' />
            <Icon name='directions_car' />
            <Icon name='directions_railway' />
            <Icon name='directions_walk' />
            <Icon name='flight' />
            <Icon name='train' />
            <Icon className={styles.addIcon} name='add' />
          </div>
        </div>

        <div className={styles.row}>
          <h3 className={styles.title}>Continents:</h3>
          <div className={styles.detail}>
            <span className={styles.rowItem}>Africa</span>
            <span className={styles.rowItem}>Asia</span>
            <span className={styles.rowItem}>Europe</span>
            <span className={styles.rowItem}>America</span>
            <Icon className={styles.addIcon} name='add' />
          </div>
        </div>
      </div>
    );
  }
}
