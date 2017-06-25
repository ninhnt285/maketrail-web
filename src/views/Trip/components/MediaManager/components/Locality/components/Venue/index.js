import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Venue.scss';

export default class Venue extends Component {
  static propTypes = {
    venue: PropTypes.object.isRequired
  };

  render() {
    const { venue } = this.props;
    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{venue.name}</h3>
        {venue.attachments.map(attachment =>
          <div key={attachment.id} className={styles.attachmentBox}>
            <img
              className={styles.previewImg}
              src={attachment.photoPreviewUrl}
              alt={attachment.id}
            />
          </div>
        )}
      </div>
    );
  }
}
