import React from 'react';
import { Button } from 'react-mdl';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import styles from './Header.scss';

export default class HeaderComponent extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    onClickUser: PropTypes.func.isRequired
  }

  static defaultProps = {
    user: null
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
        <div className={styles.root}>
          <Link to='/' className={styles.logo} />
          <div className={styles.link}>
            <Button className={styles.name} id='name_menu' onClick={this.props.onClickUser}>
              <div className={styles.shortName}>{sortName}</div>
              <div className={styles.fullname}>{fullName}</div>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <div className={styles.logo} />
        <div className={styles.link}>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    );
  }
}
