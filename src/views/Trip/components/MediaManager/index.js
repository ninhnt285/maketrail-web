import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Locality from './components/Locality';
import styles from './MediaManager.scss';

export default class MediaManager extends Component {
  static propTypes = {
    attachments: PropTypes.array.isRequired,
    localities: PropTypes.array.isRequired,
  }
  render() {
    const { attachments, localities } = this.props;
    return (
      <div className={styles.root}>
        {localities.map(locality =>
          <Locality key={locality.node.id} locality={locality.node} attachments={attachments} />
        )}
      </div>
    );
  }
}
