/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Relay from 'react-relay';
import { Grid, Cell, Textfield, Button } from 'react-mdl';
import Page from 'components/Page/PageComponent';
import LoginMutation from 'mutations/Login/LoginMutation';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: '',
      password: '',
      serverErrors: []
    };
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

    const loginMutation = new LoginMutation({
      usernameOrEmail,
      password
    });

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

    return true;
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
        <div style={{ width: '70%', margin: 'auto' }}>
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
            </form>
          </Grid>
        </div>
      </Page>
    );
  }
}
