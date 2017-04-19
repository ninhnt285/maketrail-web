import React from 'react';
import Relay from 'react-relay';
import { Grid, Cell, Textfield, Button } from 'react-mdl';
import Page from '../../components/Page/PageComponent';
import RegisterMutation from '../../mutations/Register/RegisterMutation';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      username: '',
      password: '',
      email: '',
      serverErrors: []
    };

    this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const fullName = this.state.fullName;
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;

    if ((!fullName || !username || !email || !password)) {
      this.setState({
        serverErrors: [
          'Something went wrong! Please try again!'
        ]
      });
      return false;
    }

    const registerMutation = new RegisterMutation({
      fullName,
      username,
      email,
      password
    });

    Relay.Store.commitUpdate(
      registerMutation,
      {
        onSuccess: (response) => {
          if (!response.register) {
            return this.setState({
              serverErrors: [
                'Something went wrong! Please try again!'
              ]
            });
          }
          const registerPayload = response.register;

          if (!registerPayload.success) {
            return this.setState({
              serverErrors: registerPayload.errors
            });
          }

          if (registerPayload.accessToken != null) {
            localStorage.setItem('accessToken', registerPayload.accessToken);
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
      <Page heading='Register'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <Grid>
            <form style={{ margin: 'auto' }} onSubmit={this.onSubmit}>
              <span style={{ color: 'red' }}>{this.state.serverErrors[0]}</span>
              <Cell col={12}>
                <Textfield name='fullName' onChange={this.handleTextfieldChange} label='Full Name' floatingLabel required />
              </Cell>
              <Cell col={12}>
                <Textfield name='username' onChange={this.handleTextfieldChange} label='Username' floatingLabel required />
              </Cell>
              <Cell col={12}>
                <Textfield name='email' onChange={this.handleTextfieldChange} label='Email' type='email' floatingLabel required />
              </Cell>
              <Cell col={12}>
                <Textfield name='password' onChange={this.handleTextfieldChange} label='Password' type='password' floatingLabel required />
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <Button primary>Register</Button>
              </Cell>
            </form>
          </Grid>
        </div>
      </Page>
    );
  }
}
