import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import AddCommentForm from './components/AddCommentForm';
import styles from './CommentBox.scss';

class CommentBox extends Component {
  static propTypes = {
    relay: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { relay, parentId } = this.props;

    relay.setVariables({ parentId });
  }

  render() {
    const comments = this.props.viewer.allComments.edges;

    return (
      <div className={styles.root}>
        {comments.map(({ node: comment }) =>
          <div key={comment.id} className={styles.commentWrapper}>
            <img className={styles.commentUserImage} src='' alt='FN' />
            <div className={styles.commentContent}>
              <span className={styles.userLink}>
                <a>Full Name</a>
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
    parentId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id
          fullName
          profilePicUrl
        }
        allComments(first: 100, parentId: $parentId) {
          edges {
            node {
              id
              text
            }
          }
        }
      }
    `
  }
});
