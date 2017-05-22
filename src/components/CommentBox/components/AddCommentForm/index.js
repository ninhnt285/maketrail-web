import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import AddCommentMutation from 'mutations/Comment/AddCommentMutation';

import styles from './AddCommentForm.scss';

export default class AddCommentForm extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.onSubmitComment = this.onSubmitComment.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }

  onSubmitComment(e) {
    if ((e.keyCode === 13) && (this.state.text !== '')) {
      const addCommentMutation = new AddCommentMutation({
        parentId: this.props.parentId,
        text: this.state.text
      });

      Relay.Store.commitUpdate(addCommentMutation, {
        onSuccess: () => {
          this.setState({ text: '' });
        }
      });
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className={styles.root}>
        <img
          className={styles.userAvatar}
          src={user.profilePicUrl.replace('%s', '_50_square')}
          alt={user.fullName}
        />
        <input
          value={this.state.text}
          className={styles.commentInput}
          type='text'
          placeholder='Write a comment...'
          onKeyDown={this.onSubmitComment}
          onChange={this.onChangeText}
          autoFocus={true}
        />
      </div>
    );
  }
}
