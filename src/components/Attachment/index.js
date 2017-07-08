/* eslint-disable */
import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import { extendClassName, extendStyle } from 'libs/component';

import Modal from 'components/Modal';
import FeedLinks from 'components/FeedLinks';
import CommentBox from 'components/CommentBox';
import FeedHeader from '../FeedHeader';
import styles from './Attachment.scss';

class Attachment extends Component {
  static propTypes = {
    attachment: PropTypes.object.isRequired,
    singlePhoto: PropTypes.bool,
    feed: PropTypes.object,
    showDelete: PropTypes.bool
  };

  static defaultProps = {
    singlePhoto: false,
    feed: null,
    showDelete: false
  };

  constructor(props) {
    super(props);
    this.state = { showModal: false, showComment: true };
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.showModal = this.showModal.bind(this);
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

  render() {
    const { attachment, singlePhoto, feed } = this.props;
    let defaultStyle = {};
    let parentId = attachment.id;
    if (singlePhoto) {
      defaultStyle = { width: '100%', height: 'auto' };
      parentId = feed.id;
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
            {this.props.feed &&
              <div style={{ display: 'inline-block', width: '290px', marginLeft: '10px', verticalAlign: 'top' }}>
                <FeedHeader
                  user={feed.from}
                  timestamp={feed.createdAt}
                  privacy={feed.privacy}
                  placeName={attachment.placeName}
                  placeId={attachment.placeId}
                />
                {singlePhoto &&
                  <FeedLinks
                    onShowComment={this.onShowComment}
                    parentId={feed.id}
                    isLiked={feed.isLiked}
                    statistics={feed.statistics}
                  />
                }
                {!singlePhoto &&
                  <FeedLinks
                    onShowComment={this.onShowComment}
                    parentId={parentId}
                    isLiked={attachment.isLiked}
                    statistics={attachment.statistics}
                  />
                }
                <CommentBox showComment={this.state.showComment} parentId={parentId} />
              </div>
            }
            {!this.props.feed &&
              <div style={{ display: 'inline-block', width: '290px', marginLeft: '10px', verticalAlign: 'top' }}>
                <FeedLinks
                  onShowComment={this.onShowComment}
                  parentId={parentId}
                  isLiked={attachment.isLiked}
                  statistics={attachment.statistics}
                />
                <CommentBox showComment={this.state.showComment} parentId={parentId} />
              </div>
            }
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
