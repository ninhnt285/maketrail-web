import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { extendClassName, extendStyle } from 'libs/component';

import styles from './UserFullName.scss';

export default class UserFullNameComponent extends Component {
  static propTypes = {
    user: PropTypes.object,
    fontSize: PropTypes.number,
    wrappLink: PropTypes.bool,
    viewer: PropTypes.object,
  };

  static defaultProps = {
    viewer: null,
    user: null,
    fontSize: 14,
    wrappLink: true
  };

  render() {
    let user = this.props.user;
    if (user === null) {
      user = this.props.viewer.User;
    }
    let userFullName = (<span className={styles.fullName}>{user.fullName}</span>);

    if (this.props.wrappLink) {
      userFullName = (
        <Link to={`/profile/${user.id}`}>
          {userFullName}
        </Link>
      );
    }

    return (
      <div
        className={extendClassName(this.props, `${styles.root}`)}
        style={extendStyle(this.props, { fontSize: this.props.fontSize })}
      >
        {userFullName}
      </div>
    );
  }
}
