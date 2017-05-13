/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Relay from 'react-relay';
import { Grid, Cell, Textfield, Button } from 'react-mdl';

import Page from 'components/Page/PageComponent';
import LoginMutation from 'mutations/Login/LoginMutation';

import styles from './Login.scss';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: '',
      password: '',
      serverErrors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.sendLoginMutation = this.sendLoginMutation.bind(this);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
    this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
  }

  onSubmit = (event) => {
    event.preventDefault();

    const usernameOrEmail = this.state.usernameOrEmail;
    const password = this.state.password;

    if ((!usernameOrEmail || !password)) {
      this.setState({
        serverErrors: [
          'Something went wrong! Please try again!'
        ]
      });
      return false;
    }

    return this.sendLoginMutation({
      usernameOrEmail,
      password
    });
  }

  onFacebookLogin = () => {
    window.FB.getLoginStatus((response) => {
      if (response.authResponse) {
        this.sendLoginMutation({
          provider: 'facebook',
          socialToken: response.authResponse.accessToken
        });
      } else {
        window.FB.login((loginResponse) => {
          if (loginResponse.authResponse) {
            this.sendLoginMutation({
              provider: 'facebook',
              socialToken: response.authResponse.accessToken
            });
          } else {
            this.setState({
              serverErrors: [
                'Something went wrong! Please try again!'
              ]
            });
          }
        }, { scope: 'public_profile, email, user_friends' });
      }
    });
  }

  sendLoginMutation(data) {
    const loginMutation = new LoginMutation(data);

    Relay.Store.commitUpdate(
      loginMutation,
      {
        onSuccess: (response) => {
          if (!response.login) {
            return this.setState({
              serverErrors: [
                'Something went wrong! Please try again!'
              ]
            });
          }
          const loginPayload = response.login;

          if (!loginPayload.success) {
            return this.setState({
              serverErrors: loginPayload.errors
            });
          }

          if (loginPayload.accessToken != null) {
            localStorage.setItem('accessToken', loginPayload.accessToken);
            location.href = '/';
          }
          return true;
        },

        onFailure: () => {
          this.setState({
            serverErrors: [
              'Something went wrong! Please try again!'
            ]
          });
        }
      }
    );
  }

  handleTextfieldChange = (event) => {
    this.setState({
      serverErrors: [],
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <Page heading='Login'>
        <div className={styles.root}>
          <Grid>
            <form style={{ margin: 'auto' }} onSubmit={this.onSubmit}>
              <span style={{ color: 'red' }}>{this.state.serverErrors[0]}</span>
              <Cell col={12}>
                <Textfield name='usernameOrEmail' onChange={this.handleTextfieldChange} label='Username or Email' floatingLabel required />
              </Cell>
              <Cell col={12}>
                <Textfield name='password' onChange={this.handleTextfieldChange} label='Password' type='password' floatingLabel required />
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <Button primary>Login</Button>
              </Cell>

              <p className={styles.separator}>Or login with</p>
              <Button style={{ color: 'white' }} colored raised ripple onClick={this.onFacebookLogin}>
                Facebook
              </Button>
            </form>
          </Grid>
        </div>
      </Page>
    );
  }
}
