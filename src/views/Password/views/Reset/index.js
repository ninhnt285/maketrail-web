import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';

import ResetPasswordMutation from 'mutations/Password/ResetPasswordMutation';

import styles from './Reset.scss';

export default class PasswordReset extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      serverErrors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
  }

  onSubmit = (event) => {
    event.preventDefault();

    const password = this.state.password;
    if (!password) {
      this.setState({
        serverErrors: ['Something went wrong! Please try again!']
      });
      return false;
    }

    const resetPasswordMutation = new ResetPasswordMutation({
      password,
      hash: this.props.params.hash
    });

    Relay.Store.commitUpdate(
      resetPasswordMutation,
      {
        onSuccess: (response) => {
          if (!response.resetPassword) {
            return this.setState({
              serverErrors: ['Something went wrong! Please try again!']
            });
          }
          const resetPasswordPayload = response.resetPassword;

          if (!resetPasswordPayload.success) {
            return this.setState({
              serverErrors: resetPasswordPayload.errors
            });
          }

          if (resetPasswordPayload.accessToken != null) {
            localStorage.setItem('accessToken', resetPasswordPayload.accessToken);
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
      <div className={styles.root}>
        <h1 className={styles.heading}>Reset Password</h1>
        <div className={styles.content}>
          <form onSubmit={this.onSubmit}>
            <div className={styles.cell}>
              <Textfield
                onChange={this.handleTextfieldChange}
                name='password'
                label='New Password'
                floatingLabel
                required
              />
            </div>
            <div className={styles.cell}>
              <Button
                className={styles.submitBtn}
                colored
                raised
                ripple
              >
                Submit
              </Button>
              <div className='clearfix' />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
