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
    feed: PropTypes.object
  };

  static defaultProps = {
    singlePhoto: false,
    feed: null,
  };
  constructor(props) {
    super(props);
    this.state = { showModal: false, showComment: true };
  }

  onShowComment() {
    this.setState({ showComment: true });
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
    return (
      <button
        style={extendStyle(this.props, defaultStyle)}
        className={extendClassName(this.props, styles.root)}
        onClick={() => this.showModal()}
      >
        <img
          src={singlePhoto ? attachment.filePathUrl.replace('%s', '') : attachment.previewUrl.replace('%s', '_500_square')}
          alt={attachment.name}
        />
        <Modal
          showModal={this.state.showModal}
          onCloseModal={() => this.hideModal()}
          isShowAttachment
        >
          <div>
            <img
              src={attachment.filePathUrl.replace('%s', '')} alt={attachment.name}
              style={{ display: 'inline-block', maxWidth: 'calc(100% - 300px)' }}
            />
            <div style={{ display: 'inline-block', width: '290px', marginLeft: '10px', verticalAlign: 'top' }}>
              <FeedHeader
                user={feed.from}
                timestamp={feed.createdAt}
                privacy={feed.privacy}
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
          </div>
        </Modal>
      </button>
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
