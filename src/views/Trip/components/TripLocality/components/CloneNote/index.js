import React, { Component } from 'react';
import styles from './CloneNote.scss';

export default class CloneNote extends Component {
  render() {
    return (
      <div className={styles.cloneNote}>
        Do not know where to go? <button
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            color: 'blue',
            fontSize: '14px',
            padding: '0',
            cursor: 'pointer'
          }}
        >Clone</button> an itinerary from others
      </div>
    );
  }
}
