import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { Textfield, IconButton } from 'react-mdl';

import { SERVER_CHAT_URL } from 'config';
import Modal from 'components/Modal';

import MemberManager from '../MemberManager';
import Member from '../MemberManager/components/Member';
import Notify from './components/Notify';
import Message from './components/Message';
import styles from './Discussion.scss';

const socket = io(SERVER_CHAT_URL);
export default class Discussion extends Component {
  static propTypes = {
    tripId: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
      notify: null,
      text: '',
      showMemberModal: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {
    const { tripId } = this.props;
    const token = localStorage.getItem('accessToken');
    socket.emit('join', { token, tripId });
    socket.on('messages', (response) => {
      const messages = response.messages;
      this.setState({ messages });
    });
    socket.on('users', (response) => {
      const users = response.users;
      this.setState({ users });
    });
    socket.on('chat', (response) => {
      const messages = this.state.messages;
      messages.unshift(response.message);
      this.setState({ messages });
    });
    socket.on('notify', response =>
      this.setState({ notify: response })
    );
  }

  componentDidUpdate() {
    this.messagesWrap.scrollIntoView({ behavior: 'smooth' });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ text: '' });
    socket.emit('chat', this.state.text);
  }
  onTextChange(event) {
    event.preventDefault();
    this.setState({ text: event.target.value });
  }

  render() {
    const { tripId, members } = this.props;
    const messages = this.state.messages.slice(0);
    messages.reverse();
    const notify = this.state.notify;
    return (
      <div className={styles.root}>
        <div className={styles.memberManager}>
          <div className={styles.title}>
            Members
            <IconButton className={styles.addBtn} name='add' onClick={() => this.setState({ showMemberModal: true })} />
            <Modal
              showModal={this.state.showMemberModal}
              onCloseModal={() => this.setState({ showMemberModal: false })}
              title='Members Manager'
            >
              <MemberManager
                tripId={tripId}
                members={members}
              />
            </Modal>
          </div>
          <div className={styles.memberWrap}>
            {members.map(user =>
              <div className={styles.member} key={user.node.id}>
                <Member user={user.node} />
                {(this.state.users.indexOf(user.node.id) !== -1) &&
                  <div className={styles.memberVisible} />
                }
              </div>
            )}
          </div>
        </div>
        <div className={styles.discussion}>
          {notify &&
            <Notify notify={notify} />
          }
          <div className={styles.messagesWrap}>
            {messages.map(message =>
              <Message message={message} key={message.id} />
            )}
            <div ref={(div) => { this.messagesWrap = div; }} />
          </div>
          <form onSubmit={this.onSubmit} className={styles.formMessage}>
            <Textfield
              value={this.state.text}
              onChange={this.onTextChange}
              label='Message ... '
              floatingLabel
            />
          </form>
        </div>
      </div>
    );
  }
}
