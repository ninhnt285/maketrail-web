import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import UserImage from 'components/UserImage';

import AddCommentForm from './components/AddCommentForm';
import styles from './CommentBox.scss';

class CommentBox extends Component {
  static propTypes = {
    relay: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired,
    showComment: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { relay, parentId } = this.props;
    relay.setVariables({
      parentId,
      showComment: this.props.showComment
    });
  }

  render() {
    if (!this.props.showComment) {
      return null;
    }

    let comments = [];
    if (this.props.viewer.allComments) {
      comments = this.props.viewer.allComments.edges;
    }

    return (
      <div className={styles.root}>
        {comments.map(({ node: comment }) =>
          <div key={comment.id} className={styles.commentWrapper}>
            <UserImage className={styles.userImage} user={comment.from} size={32} />
            <div className={styles.commentContent}>
              <span className={styles.userLink}>
                <Link to={`/profile/${comment.from.id}`}>{comment.from.fullName}</Link>
              </span> <span className={styles.commentText}>{comment.text}</span>
            </div>
          </div>
        )}
        <AddCommentForm
          parentId={this.props.parentId}
          user={this.props.viewer.user}
        />
      </div>
    );
  }
}

export default Relay.createContainer(CommentBox, {
  initialVariables: {
    parentId: null,
    showComment: false
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id
          fullName
          profilePicUrl
        }
        allComments(first: 100, parentId: $parentId) @include(if: $showComment) {
          edges {
            node {
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
          }
        }
      }
    `
  }
});
