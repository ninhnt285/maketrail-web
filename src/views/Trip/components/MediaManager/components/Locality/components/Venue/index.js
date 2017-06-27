import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
// import { IconButton } from 'react-mdl';
import Dropzone from 'react-dropzone';
import Attachment from 'components/Attachment';
import AddAttachmentMutation from 'mutations/Attachment/AddAttachmentMutation';
import uploadIcon from 'assets/upload-icon.png';
import styles from './Venue.scss';

export default class Venue extends Component {
  static propTypes = {
    venue: PropTypes.object.isRequired,
    attachments: PropTypes.array.isRequired,
  };

  onDrop(acceptedFiles) {
    const { venue } = this.props;
    acceptedFiles.map((file) => {
      const addAttachmentMutation = new AddAttachmentMutation({
        file,
        placeId: venue.originVenue.id,
        placeName: venue.originVenue.name,
      });
      Relay.Store.commitUpdate(
        addAttachmentMutation,
        // {
        //   onSuccess: (response) => {
        //     if (response.addAttachment) {
        //       const addAttachmentPayload = response.addAttachment;
        //       if (addAttachmentPayload.attachment) {
        //         const attachments = this.state.attachments.slice();
        //         attachments.push(addAttachmentPayload.attachment);
        //         _that.setState({ attachments });
        //       }
        //     }
        //   }
        // }
      );

      return true;
    });
  }
  render() {
    const { venue, attachments } = this.props;
    const attachmentsOfVenue = attachments.filter(obj => obj.placeId === venue.originVenue.id);
    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{venue.originVenue.name}</h3>
        {attachmentsOfVenue.map(node =>
          <Attachment
            key={node.id}
            className={styles.attachment}
            attachment={node}
          />
        )}
        <div className={`${styles.attachmentBox} ${styles.addBtn}`}>
          <Dropzone className={styles.uploadArea} onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
            <button>
              <img className={styles.previewImg} src={uploadIcon} alt='Upload' />
            </button>
          </Dropzone>
        </div>
      </div>
    );
  }
}
