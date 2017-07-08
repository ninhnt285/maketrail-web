import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Attachment from 'components/Attachment';
import AddAttachmentMutation from 'mutations/Attachment/AddAttachmentMutation';
import uploadIcon from 'assets/upload-icon.png';
import Venue from './components/Venue';
import styles from './Locality.scss';

export default class Locality extends Component {
  static propTypes = {
    locality: PropTypes.object.isRequired,
    attachments: PropTypes.array.isRequired,
    tripId: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      attachments: this.props.attachments,
    };
  }
  onDrop(acceptedFiles) {
    const { locality, tripId } = this.props;
    const _that = this;
    acceptedFiles.map((file) => {
      const addAttachmentMutation = new AddAttachmentMutation({
        file,
        placeId: locality.originLocality.id,
        placeName: locality.originLocality.name,
        parentId: tripId,
      });
      Relay.Store.commitUpdate(
        addAttachmentMutation,
        {
          onSuccess: (response) => {
            if (response.addAttachment) {
              const addAttachmentPayload = response.addAttachment;
              if (addAttachmentPayload.attachment) {
                const attachments = this.state.attachments;
                attachments.push(addAttachmentPayload.attachment);
                _that.setState({ attachments });
              }
            }
          }
        }
      );

      return true;
    });
  }
  render() {
    const { locality, tripId } = this.props;
    const venues = locality.localityVenues.edges;
    const attachmentsOfLocality = this.state.attachments.filter(obj => obj.placeId === locality.originLocality.id);
    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{locality.originLocality.name}</h3>
        {attachmentsOfLocality.map(node =>
          <Attachment
            key={node.id}
            className={styles.attachmentBox}
            attachment={node}
            showDelete
          />
        )}
        <div className={`${styles.attachmentBox} ${styles.addBtn}`}>
          <Dropzone className={styles.uploadArea} onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
            <button>
              <img className={styles.previewImg} src={uploadIcon} alt='Upload' />
            </button>
          </Dropzone>
        </div>
        {venues.map(venue =>
          <Venue
            key={venue.node.id}
            venue={venue.node}
            attachments={this.props.attachments}
            tripId={tripId}
          />
        )}
      </div>
    );
  }
}
