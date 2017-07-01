import React from 'react';
import Relay from 'react-relay';
import { Textfield, Button } from 'react-mdl';

import ForgotPasswordMutation from 'mutations/Password/ForgotPasswordMutation';

import styles from './Request.scss';

export default class PasswordRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      serverErrors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
  }

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;
    if (!email) {
      this.setState({
        serverErrors: ['Something went wrong! Please try again!']
      });
      return false;
    }

    const forgotPasswordMutation = new ForgotPasswordMutation({ email });

    Relay.Store.commitUpdate(
      forgotPasswordMutation,
      {
        onSuccess: (response) => {
          if (!response.forgotPassword) {
            return this.setState({
              serverErrors: ['Something went wrong! Please try again!']
            });
          }
          const forgotPasswordPayload = response.forgotPassword;

          if (!forgotPasswordPayload.success) {
            return this.setState({
              serverErrors: forgotPasswordPayload.errors
            });
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
        <h1 className={styles.heading}>Forgot Password</h1>
        <div className={styles.content}>
          <form onSubmit={this.onSubmit}>
            <div className={styles.cell}>
              <Textfield
                name='email'
                onChange={this.handleTextfieldChange}
                label='Email'
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
