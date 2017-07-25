import React, { Component } from 'react';
// import Relay from 'react-relay';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import { Textfield } from 'react-mdl';
import { SERVER_CHAT_URL } from 'config';

import Message from './components/Message';
import styles from './Discussion.scss';

const socket = io(SERVER_CHAT_URL);
export default class Discussion extends Component {
  static propTypes = {
    tripId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {
    const { userId, tripId } = this.props;
    socket.emit('join', { userId, tripId });
    socket.on('messages', (response) => {
      const messages = response.messages;
      messages.reverse();
      this.setState({ messages });
    });
    socket.on('chat', (response) => {
      const messages = this.state.messages;
      messages.push(response);
      this.setState({ messages });
    });
    socket.on('notify', (response) => {
      const messages = this.state.messages;
      const message = `${response.from} ${response.message}`;
      messages.push({ message });
      this.setState({ messages });
    });
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
    const { messages } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.messagesWrap}>
          {messages.map(message =>
            <Message message={message} />
          )}
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
    );
  }
}
