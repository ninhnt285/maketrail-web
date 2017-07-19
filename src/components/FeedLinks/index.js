import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from 'react-mdl';

import { WEBSITE_URL, SERVER_RESOURCE_URL } from 'config';
import AddLikeMutation from 'mutations/Feed/AddLikeMutation';
import DeleteLikeMutation from 'mutations/Feed/DeleteLikeMutation';

import styles from './FeedLinks.scss';

export default class FeedLinks extends Component {
  static propTypes = {
    onShowComment: PropTypes.func.isRequired,
    onShare: PropTypes.func,
    parentId: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    statistics: PropTypes.object.isRequired,
    linkForShare: PropTypes.string,
    isInModal: PropTypes.bool,
  };
  static defaultProps = {
    onShare: null,
    linkForShare: null,
    isInModal: false,
  }
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
  onShareFb() {
    let href = this.props.linkForShare;
    if ((href.indexOf(WEBSITE_URL) === -1) && (href.indexOf(SERVER_RESOURCE_URL) === -1)) {
      href = WEBSITE_URL + href;
    }
    window.FB.ui({
      method: 'share',
      href,
    });
  }
  onShare() {
    if (this.props.onShare !== null) {
      this.props.onShare();
    }
  }
  render() {
    const { isLiked, likeCount, shareCount, commentCount } = this.state;
    const { linkForShare, parentId, isInModal } = this.props;
    let statistics = '';
    statistics = (likeCount > 0) ? `${statistics} ${likeCount} like${(likeCount > 1) ? 's' : ''}` : statistics;
    if ((statistics) && (commentCount > 0)) { statistics = `${statistics} ${'\u22C5'}`; }
    statistics = (commentCount > 0) ? `${statistics} ${commentCount} comment${(commentCount > 1) ? 's' : ''}` : statistics;
    statistics = (shareCount > 0) ? `${statistics} ${shareCount} share${(shareCount > 1) ? 's' : ''}` : statistics;

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
          {(linkForShare === null) &&
            <button className={styles.link} onClick={() => this.onShare()}>Share</button>
          }
          {(linkForShare !== null) &&
            <div style={{ display: 'inline-block' }}>
              <button className={styles.link} id={`action_feed_link_${parentId}_${isInModal}`}>Share</button>
              <Menu target={`action_feed_link_${parentId}_${isInModal}`} align='left'>
                <MenuItem onClick={() => this.onShare()}>Share on my wall</MenuItem>
                <MenuItem onClick={() => this.onShareFb()}>Share to Facebook</MenuItem>
              </Menu>
            </div>
          }
        </div>
      </div>
    );
  }
}
