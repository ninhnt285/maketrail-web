import React from 'react';
import { Link } from 'react-router';
import { Navigation as MDLNavigation, Menu, MenuItem } from 'react-mdl';
import PropTypes from 'prop-types';
import styles from './Navigation.scss';

export default class NavigationComponent extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {
    user: null
  }

  onSignout = (event) => {
    event.preventDefault();

    localStorage.removeItem('accessToken');
    location.href = '/';
  }

  render() {
    if (this.props.user) {
      let sortName = this.props.user.username.substring(0, 2);
      let fullName = this.props.user.username;
      if (this.props.user.fullName) {
        sortName = this.props.user.fullName.match(/\b\w/g).join('').substring(0, 2);
        fullName = this.props.user.fullName;
      }
      return (
        <MDLNavigation className={styles.root}>
          <div className={styles.name} id='name_menu'>
            <div className={styles.shortName}>{sortName}</div>
            <div className={styles.fullname}>{fullName}</div>
          </div>
          <Menu target='name_menu' align='right'>
            <MenuItem>Logout</MenuItem>
          </Menu>
          <Link to='/logout' onClick={this.onSignout} style={{ display: 'none' }}>Log Out</Link>
        </MDLNavigation>
      );
    }

    return (
      <MDLNavigation>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </MDLNavigation>
    );
  }
}
