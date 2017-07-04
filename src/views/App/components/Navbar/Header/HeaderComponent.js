import React from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from 'react-mdl';
import { Link } from 'react-router';

import Notifications from './components/Notifications';
import styles from './Header.scss';
// import notificationStyles from './components/Notifications/Notifications.scss';

export default class HeaderComponent extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {
    user: null
  }

  constructor(props) {
    super(props);

    this.onSignout = this.onSignout.bind(this);
  }

  onSignout = (event) => {
    event.preventDefault();

    localStorage.removeItem('accessToken');
    location.href = '/';
  }

  render() {
    const { user } = this.props;

    if (user) {
      let sortName = user.username.substring(0, 2);
      let fullName = user.username;
      if (this.props.user.fullName) {
        sortName = user.fullName.match(/\b\w/g).join('').substring(0, 2);
        fullName = user.fullName;
      }
      return (
        <div className={styles.root}>
          <Link to='/' className={styles.logo} />
          <div className={styles.link}>
            {/* <Link className={notificationStyles.notificationBtn} to='/explore'>
              <IconButton style={{ color: '#FFF' }} name='map' />
            </Link> */}
            <Notifications />
            <Button className={styles.name} id='user_menu'>
              <div className={styles.shortName}>{sortName}</div>
              <div className={styles.fullname}>{fullName}</div>
            </Button>
            <Menu className={styles.dropMenu} target='user_menu' align='right'>
              <MenuItem><Link to='/trips'>All Trips</Link></MenuItem>
              <MenuItem><Link to={`/profile/${user.id}`}>Profile</Link></MenuItem>
              <MenuItem><Link to='/setting'>Setting</Link></MenuItem>
              <MenuItem><Link onClick={this.onSignout}>Logout</Link></MenuItem>
            </Menu>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <Link to='/' className={styles.logo} />
        <div className={styles.link}>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    );
  }
}
