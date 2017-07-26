import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import { extendClassName, extendStyle } from 'libs/component';
import ViewerQuery from 'routes/ViewerQuery';

import UserFullName from './UserFullName';
import UserFullNameComponent from './UserFullNameComponent';

export default class UserFullNameRoot extends Component {
  static propTypes = {
    userId: PropTypes.string,
    user: PropTypes.object,
    fontSize: PropTypes.number,
    wrappLink: PropTypes.bool,
  };
  static defaultProps = {
    userId: null,
    user: null,
    fontSize: 14,
    wrappLink: true
  }
  render() {
    if (this.props.userId === null) {
      return (
        <UserFullNameComponent
          user={this.props.user}
          fontSize={this.props.fontSize}
          wrappLink={this.props.wrappLink}
          className={extendClassName(this.props)}
          style={extendStyle(this.props, {})}
        />
      );
    }
    return (
      <Relay.RootContainer
        Component={UserFullName}
        route={{ queries: ViewerQuery, name: 'ViewerQuery', params: { userId: this.props.userId } }}
        renderFetched={data =>
          <UserFullName {...data} {...this.props} />
        }
      />
    );
  }
}
