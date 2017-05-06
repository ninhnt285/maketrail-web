import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { extendClassName } from 'libs/component';

import styles from './UserImage.scss';

export default class UserImage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props;
    const className = extendClassName(this.props, styles.root);

    let userImage = null;
    if (user.profilePicUrl) {
      userImage = (<img src={`${user.profilePicUrl}`} alt={user.username} />);
    } else {
      const sortName = this.props.user.fullName.match(/\b\w/g).join('').substring(0, 2);
      userImage = (<span>{sortName}</span>);
    }

    return (
      <div className={className}>
        {userImage}
      </div>
    );
  }
}
