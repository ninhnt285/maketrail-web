import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { SERVER_RESOURCE_URL } from 'config';
import { extendClassName, extendStyle } from 'libs/component';

import styles from './UserImage.scss';

export default class UserImageComponent extends Component {
  static propTypes = {
    user: PropTypes.object,
    size: PropTypes.number,
    wrappLink: PropTypes.bool,
    viewer: PropTypes.object,
  };

  static defaultProps = {
    viewer: null,
    user: null,
    size: 50,
    wrappLink: true
  };

  render() {
    const { size } = this.props;
    let user = this.props.user;
    if (user === null) {
      user = this.props.viewer.User;
    }
    let userImage = null;
    let profilePicUrl = user.profilePicUrl;
    const SERVER_RESOURCE_URL2 = SERVER_RESOURCE_URL + SERVER_RESOURCE_URL;
    if (profilePicUrl && profilePicUrl.includes(SERVER_RESOURCE_URL2)) {
      profilePicUrl = profilePicUrl.substring(SERVER_RESOURCE_URL.length);
    }
    if (profilePicUrl) {
      if (size > 50) {
        userImage = (<img src={`${profilePicUrl.replace('%s', '_500_square')}`} alt={user.username} />);
      } else {
        userImage = (<img src={`${profilePicUrl.replace('%s', '_50_square')}`} alt={user.username} />);
      }
    } else {
      const sortName = this.props.user.fullName.match(/\b\w/g).join('').substring(0, 2);
      userImage = (<span>{sortName}</span>);
    }

    if (this.props.wrappLink) {
      userImage = (
        <Link to={`/profile/${user.id}`}>
          {userImage}
        </Link>
      );
    }

    return (
      <div
        className={extendClassName(this.props, `${styles.root} ${styles[`size${this.props.size}`]}`)}
        style={extendStyle(this.props, {})}
      >
        {userImage}
      </div>
    );
  }
}
