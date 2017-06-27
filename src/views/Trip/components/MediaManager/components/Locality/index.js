import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Attachment from 'components/Attachment';
import Venue from './components/Venue';
import styles from './Locality.scss';

export default class Locality extends Component {
  static propTypes = {
    locality: PropTypes.object.isRequired,
    attachments: PropTypes.array.isRequired,
    tripId: PropTypes.string.isRequired,
  };

  render() {
    const { locality, attachments, tripId } = this.props;
    const venues = locality.localityVenues.edges;
    const attachmentsOfLocality = attachments.filter(obj => obj.placeId === locality.originLocality.id);
    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{locality.originLocality.name}</h3>
        {attachmentsOfLocality.map(node =>
          <Attachment
            key={node.id}
            className={styles.attachment}
            attachment={node}
          />
        )}
        {venues.map(venue =>
          <Venue
            key={venue.node.id}
            venue={venue.node}
            attachments={attachments}
            tripId={tripId}
          />
        )}
      </div>
    );
  }
}
