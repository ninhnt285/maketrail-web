import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import { extendClassName, extendStyle } from 'libs/component';
import ViewerQuery from 'routes/ViewerQuery';

import UserImage from './UserImage';
import UserImageComponent from './UserImageComponent';

export default class UserImageRoot extends Component {
  static propTypes = {
    userId: PropTypes.string,
    user: PropTypes.object,
    size: PropTypes.number,
    wrappLink: PropTypes.bool
  };
  static defaultProps = {
    userId: null,
    user: null,
    size: 50,
    wrappLink: true,
  }
  render() {
    if (this.props.userId === null) {
      return (
        <UserImageComponent
          user={this.props.user}
          size={this.props.size}
          wrappLink={this.props.wrappLink}
          className={extendClassName(this.props)}
          style={extendStyle(this.props, {})}
        />
      );
    }
    return (
      <Relay.RootContainer
        Component={UserImage}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: { userId: this.props.userId } }}
        renderFetched={data =>
          <UserImage {...data} {...this.props} />
        }
      />
    );
  }
}
