import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { IconButton, Menu, MenuItem, Textfield, Button } from 'react-mdl';

import FeedLinks from 'components/FeedLinks';
import CommentBox from 'components/CommentBox';
import FeedHeader from 'components/FeedHeader';
import Attachment from 'components/Attachment';
import AddShareMutation from 'mutations/Feed/AddShareMutation';
import DeleteAttachmentMutation from 'mutations/Attachment/DeleteAttachmentMutation';
import Modal from 'components/Modal';

import styles from './Attachment.scss';

export default class AttachmentComponent extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showComment: true,
      showShareModal: false,
    };
  }
  onDeleteAttachment() {
    const deleteAttachmentMutation = new DeleteAttachmentMutation({
      attachmentId: this.props.viewer.Attachment.id,
    });

    Relay.Store.commitUpdate(
      deleteAttachmentMutation
    );
  }

  onShare() {
    const addShareMutation = new AddShareMutation({
      parentId: this.props.viewer.Attachment.id,
      text: this.state.textShare,
      onShowFeed: false,
    });

    Relay.Store.commitUpdate(addShareMutation, {
      onSuccess: () => {
        this.setState({ textShare: '', showShareModal: false });
      }
    });
  }

  onTextShareChange(event) {
    this.setState({ textShare: event.target.value });
  }

  onShowComment() {

  }
  showEditModal() {
    this.setState({ showEditModal: true });
  }
  hideEditModal() {
    this.setState({ showEditModal: false });
  }
  showShareModal() {
    this.setState({ showShareModal: true });
  }

  hideShareModal() {
    this.setState({ showShareModal: false });
  }
  render() {
    const attachment = this.props.viewer.Attachment;
    const attachmentType = attachment.__typename.toLowerCase();
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.actions}>
            <IconButton name='expand_more' id={`action_attachment_${attachment.id}`} />
            <Menu target={`action_attachment_${attachment.id}`} align='right'>
              <MenuItem>
                <Link className={styles.linkFeed} to={`/${attachmentType}/${attachment.id}`} target='_blank'>
                  Open in new tab
                </Link>
              </MenuItem>
              <MenuItem onClick={() => this.onDeleteAttachment()}>Delete</MenuItem>
            </Menu>
          </div>
          {(attachment.from) &&
            <FeedHeader
              user={attachment.from}
              timestamp={attachment.createdAt}
              privacy={0}
              placeName={attachment.placeName}
              placeId={attachment.placeId}
            />
          }
          <p className={styles.status}>{attachment.caption}</p>
          <div className={styles.attachmentWrapper}>
            <Attachment
              className={styles.attachment}
              attachment={attachment}
              singlePhoto
              onShare={() => this.showShareModal()}
            />
          </div>
        </div>
        <FeedLinks
          onShowComment={this.onShowComment}
          parentId={attachment.id}
          isLiked={attachment.isLiked}
          statistics={attachment.statistics}
          onShare={() => this.showShareModal()}
          linkForShare={`/${attachmentType}/${attachment.id}`}
        />
        <Modal
          showModal={this.state.showShareModal}
          onCloseModal={() => this.hideShareModal()}
          title='Share post'
        >
          <div>
            <Textfield
              value={this.state.textShare}
              onChange={event => this.onTextShareChange(event)}
              label="What's on your mind?"
              rows={2}
              style={{ width: '100%' }}
            />
            <div style={{ marginLeft: '10px', borderLeft: '2px #bababa solid', paddingLeft: '10px' }}>
              {(attachment.from) &&
                <FeedHeader
                  user={attachment.from}
                  timestamp={attachment.createdAt}
                  privacy={0}
                  placeName={attachment.placeName}
                  placeId={attachment.placeId}
                />
              }
              <p className={styles.status}>{attachment.caption}</p>
              <div className={styles.attachmentWrapper}>
                <Attachment
                  className={styles.attachment}
                  attachment={attachment}
                  singlePhoto
                  onShare={() => this.showShareModal()}
                />
              </div>
            </div>
            <div className={styles.func}>
              <Button style={{ marginTop: '10px', color: '#fff' }} colored raised ripple onClick={() => this.onShare()}>Submit</Button>
              <Button style={{ marginTop: '10px', marginLeft: '10px', color: '#fff' }} raised ripple onClick={() => this.hideShareModal()}>Cancel</Button>
            </div>
          </div>
        </Modal>
        <CommentBox showComment parentId={attachment.id} />
      </div>
    );
  }
}
