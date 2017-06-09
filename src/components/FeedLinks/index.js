import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import AddLikeMutation from 'mutations/Feed/AddLikeMutation';
import DeleteLikeMutation from 'mutations/Feed/DeleteLikeMutation';

import styles from './FeedLinks.scss';

export default class FeedLinks extends Component {
  static propTypes = {
    onShowComment: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    statistics: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLiked: this.props.isLiked,
      likeCount: this.props.statistics.likeCount,
      commentCount: this.props.statistics.commentCount,
      shareCount: this.props.statistics.shareCount,
    };
  }
  onDeleteLike() {
    const deleteLikeMutation = new DeleteLikeMutation({
      parentId: this.props.parentId,
    });

    Relay.Store.commitUpdate(deleteLikeMutation, {
      onSuccess: () => {
        this.setState({ isLiked: false, likeCount: this.state.likeCount - 1 });
      }
    });
  }
  onSubmitLike() {
    const addLikeMutation = new AddLikeMutation({
      parentId: this.props.parentId,
    });

    Relay.Store.commitUpdate(addLikeMutation, {
      onSuccess: () => {
        this.setState({ isLiked: true, likeCount: this.state.likeCount + 1 });
      }
    });
  }
  render() {
    const { isLiked, likeCount, shareCount, commentCount } = this.state;
    let statistics = '';

    statistics = (likeCount > 0) ? `${statistics} ${likeCount} like${(likeCount > 1) ? 's' : ''}` : statistics;
    statistics = (commentCount > 0) ? `${statistics} ${'\u22C5'} ${commentCount} comment${(commentCount > 1) ? 's' : ''}` : statistics;
    statistics = (shareCount > 0) ? `${statistics} ${'\u22C5'} ${shareCount} share${(shareCount > 1) ? 's' : ''}` : statistics;

    return (
      <div className={styles.root}>
        {(statistics !== '') &&
          <div className={styles.statistics}>{statistics}</div>
        }
        <div className={styles.content}>
          {!isLiked &&
            <button className={styles.link} onClick={() => this.onSubmitLike()}>Like</button>
          }
          {isLiked &&
            <button className={styles.isLiked} onClick={() => this.onDeleteLike()}>Like</button>
          }
          <button className={styles.link} onClick={this.props.onShowComment}>Comment</button>
          <button className={styles.link}>Share</button>
        </div>
      </div>
    );
  }
}
