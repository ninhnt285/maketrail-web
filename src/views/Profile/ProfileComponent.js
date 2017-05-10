import React, { Component } from 'react';

import Map from './components/Map';
import styles from './Profile.scss';

export default class ProfileComponent extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Map />
      </div>
    );
  }
}
