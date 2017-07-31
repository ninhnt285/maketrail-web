/* eslint-disable */
import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import { extendClassName, extendStyle } from 'libs/component';

import { Textfield, Button } from 'react-mdl';
import Modal from 'components/Modal';
import FeedLinks from 'components/FeedLinks';
import CommentBox from 'components/CommentBox';
import AddShareMutation from 'mutations/Feed/AddShareMutation';
import FeedHeader from '../FeedHeader';
import styles from './Attachment.scss';

class Attachment extends Component {
  static propTypes = {
    attachment: PropTypes.object.isRequired,
    singlePhoto: PropTypes.bool,
    feed: PropTypes.object,
    showDelete: PropTypes.bool,
    onShare: PropTypes.func,
  };

  static defaultProps = {
    singlePhoto: false,
    feed: null,
    onShare: null,
    showDelete: false
  };

  constructor(props) {
    super(props);
    this.state = { showModal: false, showComment: true, showShareModal: false, textShare: '' };
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  onShareSubmit() {
    const addShareMutation = new AddShareMutation({
      parentId: this.props.attachment.id,
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
  showShareModal() {
    this.setState({ showShareModal: true });
  }

  hideShareModal() {
    this.setState({ showShareModal: false });
  }
  onShowComment() {
    this.setState({ showComment: true });
  }

  onDeleteClicked(e) {
    e.preventDefault();
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }
  onShare() {
    if (this.props.onShare != null) {
      this.props.onShare();
    } else {
      this.showShareModal();
    }
  }
  render() {
    const { attachment, singlePhoto, feed } = this.props;
    let defaultStyle = {};
    let parentId = attachment.id;
    if (singlePhoto) {
      defaultStyle = { width: '100%', height: 'auto' };
    }
    let typeVideo = '';
    if (attachment.__typename === 'Video') {
      typeVideo = `video/${attachment.filePathUrl.substring(attachment.filePathUrl.length - 3, attachment.filePathUrl.length)}`;
    }
    return (
      <div
        style={extendStyle(this.props, defaultStyle)}
        className={extendClassName(this.props, styles.root)}
      >
        {this.props.showDelete &&
          <a className={styles.deleteBtn} onClick={this.onDeleteClicked}>x</a>
        }
        <div className={styles.wrapper} onClick={() => this.showModal()}>
          {(attachment.__typename === 'Photo') &&
            <img
              src={singlePhoto ? attachment.filePathUrl.replace('%s', '_1000') : attachment.previewUrl.replace('%s', '_500_square')}
              alt={attachment.name}
            />
          }
          {(attachment.__typename === 'Video') &&
            <video width='100%' controls>
              <source src={attachment.filePathUrl} type={typeVideo} />
              <div>Your browser does not support HTML5 video.</div>
            </video>
          }
        </div>

        <Modal
          showModal={this.state.showModal}
          onCloseModal={() => this.hideModal()}
          isShowAttachment
        >
          <div>
            {(attachment.__typename === 'Photo') &&
              <img
                src={attachment.filePathUrl.replace('%s', '_1000')} alt={attachment.name}
                style={{ display: 'inline-block', maxWidth: 'calc(100% - 300px)' }}
              />
            }
            {(attachment.__typename === 'Video') &&
              <video width='calc(100% - 300px)' controls>
                <source src={attachment.filePathUrl} type={typeVideo} />
                <div>Your browser does not support HTML5 video.</div>
              </video>
            }
            {feed &&
              <div style={{ display: 'inline-block', width: '290px', marginLeft: '10px', verticalAlign: 'top' }}>
                <FeedHeader
                  user={feed.from}
                  timestamp={feed.createdAt}
                  privacy={feed.privacy}
                  placeName={attachment.placeName}
                  placeId={attachment.placeId}
                />
                <FeedLinks
                  onShowComment={this.onShowComment}
                  parentId={parentId}
                  isLiked={attachment.isLiked}
                  statistics={attachment.statistics}
                  onShare={() => this.onShare()}
                  isInModal
                  linkForShare={attachment.filePathUrl.replace('%s', '_1000')}
                />
                <CommentBox showComment={this.state.showComment} parentId={parentId} />
              </div>
            }
            {!feed &&
              <div style={{ display: 'inline-block', width: '290px', marginLeft: '10px', verticalAlign: 'top' }}>
                <FeedLinks
                  onShowComment={this.onShowComment}
                  parentId={parentId}
                  isLiked={attachment.isLiked}
                  statistics={attachment.statistics}
                  onShare={() => this.onShare()}
                  isInModal
                  linkForShare={attachment.filePathUrl.replace('%s', '_1000')}
                />
                <CommentBox showComment={this.state.showComment} parentId={parentId} />
              </div>
            }
          </div>
        </Modal>
        <Modal
          showModal={this.state.showShareModal}
          onCloseModal={() => this.hideShareModal()}
          title={`Share ${attachment.__typename}`}
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
            {(attachment.__typename === 'Photo') &&
              <img
                src={singlePhoto ? attachment.filePathUrl.replace('%s', '_1000') : attachment.previewUrl.replace('%s', '_500_square')}
                alt={attachment.name}
              />
            }
            {(attachment.__typename === 'Video') &&
              <video width='100%' controls>
                <source src={attachment.filePathUrl} type={typeVideo} />
                <div>Your browser does not support HTML5 video.</div>
              </video>
            }
            </div>
            <div className={styles.func}>
              <Button style={{ marginTop: '10px', color: '#fff' }} colored raised ripple onClick={() => this.onShareSubmit()}>Submit</Button>
              <Button style={{ marginTop: '10px', marginLeft: '10px', color: '#fff' }} raised ripple onClick={() => this.hideShareModal()}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Relay.createContainer(Attachment, {
  fragments: {
    attachment: () => Relay.QL`
      fragment on Attachment {
        __typename
        ... on Photo {
          id
          name
          placeId
          placeName
          caption
          previewUrl
          filePathUrl
          isLiked
          statistics {
            likeCount
            commentCount
          }
        }

        ... on Video {
          id
          name
          placeId
          placeName
          caption
          previewUrl
          filePathUrl
          isLiked
          statistics {
            likeCount
            commentCount
          }
        }
      }
    `
  }
});
