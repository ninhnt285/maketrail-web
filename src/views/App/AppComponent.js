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

  componentDidMount() {
    this.loadFbSdk();
  }

  render() {
    const user = this.props.viewer.user;

    if (!user) {
      const path = this.props.location.pathname;
      let redirect = true;
      if (path.indexOf('/password/reset') !== -1) {
        redirect = false;
      }

      if (['/', '/login', '/register', '/password/request'].indexOf(path) !== -1) {
        redirect = false;
      }

      if (redirect) {
        localStorage.removeItem('accessToken');
        location.href = '/';
      }
    }

    return (
      <div className={styles.root}>
        <Header user={user} onClickUser={this.onClickUserMenu} />
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
