import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { extendClassName } from 'libs/component';

import styles from './UserImage.scss';

export default class UserImage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.number,
    wrappLink: PropTypes.bool
  };

  static defaultProps = {
    size: 50,
    wrappLink: true
  };

  render() {
    const { user } = this.props;
    const className = extendClassName(this.props, `${styles.root} ${styles[`size${this.props.size}`]}`);

    let userImage = null;
    if (user.profilePicUrl) {
      userImage = (<img src={`${user.profilePicUrl.replace('%s', '_50_square')}`} alt={user.username} />);
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
      <div className={className}>
        {userImage}
      </div>
    );
  }
}
