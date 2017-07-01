/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Grid, Cell, Textfield, Button } from 'react-mdl';

import Page from 'components/Page/PageComponent';
import UpdateUserMutation from 'mutations/User/UpdateUserMutation';
import ChangePasswordMutation from 'mutations/User/ChangePasswordMutation';
import Modal from 'components/Modal';

import styles from './Setting.scss';

export default class Login extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.viewer.user.fullName,
      serverErrors: [],
      showChangePasswordModal: false,
      errorChangePassword: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.fullName === this.props.viewer.user.fullName) {
      return;
    }
    const updateUserMutation = new UpdateUserMutation({
      fullName: this.state.fullName,
    });
    Relay.Store.commitUpdate(
      updateUserMutation
    );
  }
  onChangePassword(event) {
    event.preventDefault();
    if ((!this.state.newPassword) || (this.state.newPassword.length < 6)) {
      return this.setState({ errorChangePassword: 'Too short' });
    }
    if (this.state.newPassword !== this.state.reNewPassword) {
      return this.setState({ errorChangePassword: 'Re-enter new password' });
    }
    const changePasswordMutation = new ChangePasswordMutation({
      password: this.state.oldPassword,
      passwordNew: this.state.newPassword
    });
    // const _that = this;
    Relay.Store.commitUpdate(
      changePasswordMutation,
      {
        onSuccess: (response) => {
          if (!response.changePassword.success) {
            return this.setState({ errorChangePassword: 'Error' });
          }
          const changePasswordPayload = response.changePassword;
          if (changePasswordPayload.accessToken != null) {
            localStorage.setItem('accessToken', changePasswordPayload.accessToken);
            // location.href = '/';
          }
          return this.setState({ showChangePasswordModal: false });
        },
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
      <Page heading='Setting'>
        <div className={styles.root}>
          <Grid>
            <form style={{ margin: 'auto' }} onSubmit={this.onSubmit}>
              <span style={{ color: 'red' }}>{this.state.serverErrors[0]}</span>
              <Cell col={12}>
                <Textfield name='fullName' value={this.state.fullName} onChange={this.handleTextfieldChange} label='Fullname' floatingLabel required />
              </Cell>
              <Cell col={12}>
                <Button
                  className={styles.changePasswordBtn}
                  primary
                  onClick={() => this.setState({ showChangePasswordModal: true })}
                >
                  Change password
                </Button>
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <Button primary>Save</Button>
              </Cell>
            </form>
            <Modal
              showModal={this.state.showChangePasswordModal}
              onCloseModal={() => this.setState({ showChangePasswordModal: false })}
              title='Change password'
            >
              <form style={{ margin: 'auto', width: '300px' }} onSubmit={this.onChangePassword}>
                <Textfield name='oldPassword' onChange={this.handleTextfieldChange} label='Old password' floatingLabel required />
                <Textfield name='newPassword' onChange={this.handleTextfieldChange} label='New password' floatingLabel required />
                <Textfield name='reNewPassword' onChange={this.handleTextfieldChange} label='Re-enter new password' floatingLabel required />
                <div style={{ color: 'red' }}>{this.state.errorChangePassword}</div>
                <Button primary>Save</Button>
              </form>
            </Modal>
          </Grid>
        </div>
      </Page>
    );
  }
}
