import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem } from 'react-mdl';

import UpdateCommentMutation from 'mutations/Comment/UpdateCommentMutation';
import DeleteCommentMutation from 'mutations/Comment/DeleteCommentMutation';
import UserImage from 'components/UserImage';
import UserFullName from 'components/UserFullName';

import styles from './Comment.scss';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isEditComment: false,
      text: props.comment.text,
    };
  }
  onEditComment(e) {
    if ((e.keyCode === 13) && (this.state.text !== '')) {
      const updateCommentMutation = new UpdateCommentMutation({
        commentId: this.props.comment.id,
        text: this.state.text,
      });
      // const _that = this;
      Relay.Store.commitUpdate(updateCommentMutation, {
        onSuccess: () => {
          this.setState({ isEditComment: false });
        }
      });
    }
  }
  onDeleteComment() {
    const deleteCommentMutation = new DeleteCommentMutation({
      commentId: this.props.comment.id,
      parentId: this.props.parentId,
    });

    Relay.Store.commitUpdate(
      deleteCommentMutation
    );
  }
  onChangeText(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }
  render() {
    const { comment, userId } = this.props;
    return (
      <div key={comment.id} className={styles.commentWrapper}>
        <UserImage className={styles.userImage} user={comment.from} size={32} />
        {!this.state.isEditComment &&
          <div className={styles.commentContent}>
            <UserFullName className={styles.userLink} user={comment.from} />
            &nbsp;<span className={styles.commentText}>{comment.text}</span>
          </div>
        }
        {this.state.isEditComment &&
          <div className={styles.commentContent}>
            <input
              value={this.state.text}
              className={styles.commentInput}
              type='text'
              placeholder='Write a comment...'
              onKeyDown={event => this.onEditComment(event)}
              onChange={event => this.onChangeText(event)}
              autoFocus={true}
            />
          </div>
        }
        {(comment.from.id === userId) &&
          <div className={styles.actions}>
            <IconButton name='create' id={`action_comment_${comment.id}`} />
            <Menu target={`action_comment_${comment.id}`} align='right'>
              <MenuItem onClick={() => this.setState({ isEditComment: true, text: comment.text })}>Edit</MenuItem>
              <MenuItem onClick={() => this.onDeleteComment()}>Delete</MenuItem>
            </Menu>
          </div>
        }
      </div>
    );
  }
}

export default Relay.createContainer(Comment, {

  fragments: {
    comment: () => Relay.QL`
      fragment on Comment {
        id
        text
        from {
          ... on User {
            id
            username
            fullName
            profilePicUrl
          }
        }
      }
    `
  }
});
