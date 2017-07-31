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
import DeleteFeedMutation from 'mutations/Feed/DeleteFeedMutation';
import Modal from 'components/Modal';

import AddFeedForm from '../AddFeedForm';
import FeedShare from './components/FeedShare';

import styles from './Feed.scss';

class Feed extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired,
    parentId: PropTypes.string,
    places: PropTypes.array,
    userId: PropTypes.string,
    showComment: PropTypes.bool,
  };

  static defaultProps = {
    parentId: null,
    places: [],
    userId: null,
    showComment: false,
  }
  constructor(props) {
    super(props);

    this.state = { textShare: '', showComment: this.props.showComment, showEditModal: false, showShareModal: false };

    this.onShowComment = this.onShowComment.bind(this);
  }

  onDeleteFeed() {
    const deleteFeedMutation = new DeleteFeedMutation({
      feedId: this.props.feed.id,
      parentId: this.props.parentId,
    });

    Relay.Store.commitUpdate(
      deleteFeedMutation
    );
  }

  onShare() {
    const onShowFeed = ((this.props.parentId === null) || (this.props.parentId === this.props.userId));
    const addShareMutation = new AddShareMutation({
      parentId: this.props.feed.id,
      text: this.state.textShare,
      onShowFeed,
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
    this.setState({ showComment: true });
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
    const { feed } = this.props;
    const attachments = feed.attachments.edges;
    let feedType = feed.type.toLowerCase();
    if (feedType === 'share') {
      feedType = 'post';
    }
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.actions}>
            <IconButton name='expand_more' id={`action_feed_${feed.id}`} />
            <Menu target={`action_feed_${feed.id}`} align='right'>
              <MenuItem>
                <Link className={styles.linkFeed} to={`/${feedType}/${feed.id}`} target='_blank'>
                  Open in new tab
                </Link>
              </MenuItem>
              <MenuItem onClick={() => this.showEditModal()}>Edit</MenuItem>
              <MenuItem onClick={() => this.onDeleteFeed()}>Delete</MenuItem>

            </Menu>
            <Modal
              showModal={this.state.showEditModal}
              onCloseModal={() => this.hideEditModal()}
              title='Edit post'
            >
              <AddFeedForm
                parentId={this.props.parentId}
                feed={feed}
                places={this.props.places}
                onUpdated={() => this.hideEditModal()}
              />
            </Modal>
          </div>
          <FeedHeader
            user={feed.from}
            timestamp={feed.createdAt}
            privacy={feed.privacy}
            placeName={feed.placeName}
            placeId={feed.placeId}
          />
          <p className={styles.status}>{feed.text}</p>
          {(feed.type === 'SHARE') && (feed.parent) &&
            <FeedShare parent={feed.parent} />
          }
          {attachments.length > 0 &&
            <div className={styles.attachmentWrapper}>
              {attachments.map(edge =>
                <Attachment
                  key={edge.cursor}
                  className={styles.attachment}
                  attachment={edge.node}
                  singlePhoto={(attachments.length === 1)}
                  feed={feed}
                  onShare={(attachments.length === 1) ? (() => this.showShareModal()) : null}
                />
              )}
            </div>
          }
        </div>
        <FeedLinks
          onShowComment={this.onShowComment}
          parentId={(feedType === 'post') ? feed.id : attachments[0].node.id}
          isLiked={(feedType === 'post') ? feed.isLiked : attachments[0].node.isLiked}
          statistics={(feedType === 'post') ? feed.statistics : attachments[0].node.statistics}
          feed={feed}
          onShare={() => this.showShareModal()}
          linkForShare={`/${feedType}/${feed.id}`}
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
              <FeedHeader
                user={feed.from}
                timestamp={feed.createdAt}
                privacy={feed.privacy}
                placeName={feed.placeName}
                placeId={feed.placeId}
              />
              <p className={styles.status}>{feed.text}</p>
              {attachments.map(edge =>
                <Attachment
                  key={edge.cursor}
                  style={{ display: 'inline-block', width: '150px', height: '150px', marginRight: '2px' }}
                  attachment={edge.node}
                  singlePhoto={(attachments.length === 1)}
                  feed={feed}
                />
              )}
            </div>
            <div className={styles.func}>
              <Button style={{ marginTop: '10px', color: '#fff' }} colored raised ripple onClick={() => this.onShare()}>Submit</Button>
              <Button style={{ marginTop: '10px', marginLeft: '10px', color: '#fff' }} raised ripple onClick={() => this.hideShareModal()}>Cancel</Button>
            </div>
          </div>
        </Modal>
        <CommentBox showComment={this.state.showComment} parentId={(feedType === 'post') ? feed.id : attachments[0].node.id} />
      </div>
    );
  }
}

export default Relay.createContainer(Feed, {
  fragments: {
    feed: () => Relay.QL`
      fragment on Feed {
        id
        text
        privacy
        createdAt
        isLiked
        placeId
        placeName
        type
        parent {
          ${FeedShare.getFragment('parent')}
        }
        from {
          ... on User {
            id
            username
            fullName
            profilePicUrl
          }
        }
        statistics {
          likeCount
          shareCount
          commentCount
        }
        attachments(first: 5) {
          edges {
            cursor
            node {
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
              ${Attachment.getFragment('attachment')}
            }
          }
        }
      }
    `
  }
});
