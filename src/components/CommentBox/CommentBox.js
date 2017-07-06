import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import Comment from './components/Comment';
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
          <Comment
            key={comment.id}
            comment={comment}
            userId={this.props.viewer.user.id}
            parentId={this.props.parentId}
          />
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
              ${Comment.getFragment('comment')}
            }
          }
        }
      }
    `
  }
});
