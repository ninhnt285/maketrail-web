import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import ViewerQuery from 'routes/ViewerQuery';

import CommentBox from './CommentBox';

export default class CommentBoxRoot extends Component {
  static propTypes = {
    parentId: PropTypes.string.isRequired,
    showComment: PropTypes.bool.isRequired
  };

  render() {
    return (
      <Relay.RootContainer
        Component={CommentBox}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: { parentId: this.props.parentId, showComment: this.props.showComment } }}
        renderFetched={data =>
          <CommentBox {...data} {...this.props} />
        }
      />
    );
  }
}
