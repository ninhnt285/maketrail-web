import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { extendClassName, extendStyle } from 'libs/component';

import styles from './UserFullName.scss';

export default class UserFullName extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    fontSize: PropTypes.number,
    wrappLink: PropTypes.bool
  };

  static defaultProps = {
    fontSize: 14,
    wrappLink: true
  };

  render() {
    const { user } = this.props;

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
