import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem } from 'react-mdl';

import FeedLinks from 'components/FeedLinks';
import CommentBox from 'components/CommentBox';
import FeedHeader from 'components/FeedHeader';
import Attachment from 'components/Attachment';
import DeleteFeedMutation from 'mutations/Feed/DeleteFeedMutation';
import Modal from 'components/Modal';

import AddFeedForm from '../AddFeedForm';

import styles from './Feed.scss';

class Feed extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired,
    parentId: PropTypes.string,
    places: PropTypes.array,
  };

  static defaultProps = {
    parentId: null,
    places: [],
  }
  constructor(props) {
    super(props);

    this.state = { showComment: false, showEditModal: false, };

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
  onShowComment() {
    this.setState({ showComment: true });
  }
  showEditModal() {
    this.setState({ showEditModal: true });
  }

  hideEditModal() {
    this.setState({ showEditModal: false });
  }
  render() {
    const { feed } = this.props;
    const attachments = feed.attachments.edges;

    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.actions}>
            <IconButton name='expand_more' id={`action_feed_${feed.id}`} />
            <Menu target={`action_feed_${feed.id}`} align='right'>
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
          {attachments.length > 0 &&
            <div className={styles.attachmentWrapper}>
              {attachments.length === 1 &&
                <Attachment
                  className={styles.attachment}
                  attachment={attachments[0].node}
                  singlePhoto
                  feed={feed}
                />
              }

              {attachments.length > 1 &&
                attachments.map(edge =>
                  <Attachment
                    key={edge.cursor}
                    className={styles.attachment}
                    attachment={edge.node}
                    feed={feed}
                  />
                )
              }
            </div>
          }
        </div>
        <FeedLinks
          onShowComment={this.onShowComment}
          parentId={feed.id}
          isLiked={feed.isLiked}
          statistics={feed.statistics}
        />
        <CommentBox showComment={this.state.showComment} parentId={feed.id} />
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
              }
              ... on Video {
                id
              }
              ${Attachment.getFragment('attachment')}
            }
          }
        }
      }
    `
  }
});
