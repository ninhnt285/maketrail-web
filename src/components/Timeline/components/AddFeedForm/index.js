import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';
import Dropzone from 'react-dropzone';

import AddAttachmentMutation from 'mutations/Attachment/AddAttachmentMutation';
import AddFeedMutation from 'mutations/Feed/AddFeedMutation';

import LocalityFinder from 'components/LocalityFinder';

import styles from './AddFeedForm.scss';

export default class AddFeedForm extends Component {
  static propTypes = {
    parentId: PropTypes.string
  };

  static defaultProps = {
    parentId: null
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      attachments: [],
      checkin: '',
      isShowCheckinBox: false,
    };

    this.onDrop = this.onDrop.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDrop(acceptedFiles) {
    const _that = this;
    acceptedFiles.map((file) => {
      const addAttachmentMutation = new AddAttachmentMutation({
        file
      });
      Relay.Store.commitUpdate(
        addAttachmentMutation,
        {
          onSuccess: (response) => {
            if (response.addAttachment) {
              const addAttachmentPayload = response.addAttachment;
              if (addAttachmentPayload.attachment) {
                const attachments = this.state.attachments.slice();
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

  onTextChange(event) {
    this.setState({ text: event.target.value });
  }
  onShowCheckinBox() {
    this.setState({ isShowCheckinBox: true });
  }
  onSubmit() {
    const attachmentIds = [];
    this.state.attachments.map((attachment) => {
      attachmentIds.push(attachment.id);
      return true;
    });

    const addFeedMutation = new AddFeedMutation({
      parentId: this.props.parentId,
      text: this.state.text,
      attachmentIds
    });

    Relay.Store.commitUpdate(addFeedMutation, {
      onSuccess: () => {
        this.setState({ text: '' });
      }
    });
  }
  onAddLocality(localityId, name) {
    this.setState({ checkin: name, isShowCheckinBox: false });
  }
  render() {
    return (
      <div className={styles.root}>
        <Textfield
          value={this.state.text}
          onChange={this.onTextChange}
          label="What's on your mind?"
          rows={2}
          style={{ width: '100%' }}
        />
        {this.state.isShowCheckinBox &&
          <div className={styles.checkinBox}>
            <LocalityFinder onAddLocality={(id, name) => this.onAddLocality(id, name)} />
          </div>
        }
        {this.state.checkin &&
          <div className={styles.checkinAddressBox}> — at <span className={styles.checkinAddress}>{this.state.checkin}</span>.</div>
        }
        {this.state.attachments.length > 0 &&
          <div className={styles.previewWrapper}>
            {this.state.attachments.map(attachment =>
              <img
                key={attachment.id}
                src={attachment.previewUrl.replace('%s', '_150_square')}
                alt={attachment.caption}
              />
            )}
          </div>
        }
        <div className={styles.func}>
          <Dropzone className={styles.uploadArea} onDrop={this.onDrop}>
            <Button colored raised ripple>Photo/Video</Button>
          </Dropzone>
          <Button colored raised ripple onClick={() => this.onShowCheckinBox()}>Check in</Button>
          <br />
          <Button style={{ marginTop: '10px' }} colored raised ripple onClick={this.onSubmit}>Submit</Button>
        </div>
      </div>
    );
  }
}
