/* eslint-disable */
import React from 'react';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import { Link } from 'react-router';
import { Layout, Content, Menu, MenuItem } from 'react-mdl';
import PropTypes from 'prop-types';

import { FB_APP_ID } from 'config';

import Header from './components/Navbar/Header/HeaderComponent';
import Footer from './components/Footer/FooterComponent';
import styles from './App.scss';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  loadFbSdk() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : FB_APP_ID,
        cookie     : true,
        xfbml      : true,
        version    : 'v2.9',
        status     : true
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  onSignout = (event) => {
    event.preventDefault();

    localStorage.removeItem('accessToken');
    location.href = '/';
  }

  onClickUserMenu = () => {
    this.userMenu.click();
  }

  componentDidMount() {
    this.loadFbSdk();
  }

  render() {
    const user = this.props.viewer.user;

    if (!user) {
      const path = this.props.location.pathname;
      if (['/', '/login', '/register'].indexOf(path) === -1) {
        localStorage.removeItem('accessToken');
        location.href = '/';
      }
    }

    return (
      <Layout className={styles.root}>
        <Header user={user} onClickUser={this.onClickUserMenu} />
        <Content className={styles.content}>
          {this.props.children}
        </Content>
        { user &&
          <div>
            <button className={styles.menu} id='user_menu' ref={(input) => { this.userMenu = input; }} />
            <Menu target='user_menu' align='right'>
              <MenuItem><Link to='trips'>All Trips</Link></MenuItem>
              <MenuItem><Link to={`/profile/${user.id}`}>Profile</Link></MenuItem>
              <MenuItem onClick={this.onSignout}>Logout</MenuItem>
            </Menu>
          </div>
        }
        <Footer />
      </Layout>
    );
  }
}
