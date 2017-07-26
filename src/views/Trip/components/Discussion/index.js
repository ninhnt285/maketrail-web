import React, { Component } from 'react';
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
      users: [],
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
      this.setState({ messages });
    });
    socket.on('chat', (response) => {
      const messages = this.state.messages;
      messages.unshift({ fromId: response.from, message: response.message });
      this.setState({ messages });
    });
    socket.on('notify', (response) => {
      const messages = this.state.messages;
      messages.unshift({ fromId: response.from, message: response.message });
      this.setState({ messages });
    });
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

  // getUser(userId) {
  //   const accessToken = localStorage.getItem('accessToken');
  //   fetch(SERVER_URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: accessToken,
  //     },
  //     body: JSON.stringify({
  //       query: `query {
  //                 viewer {
  //                   User(id: "${userId}") {
  //                     id
  //                     username
  //                     fullName
  //                     profilePicUrl
  //                   }
  //                 }
  //               }`,
  //     })
  //   }).then(response => response.json())
  //   .then((responseJson) => {
  //     console.log(responseJson);
  //     // const users = this.state.users;
  //     // users[userId] = responseJson.data.viewer.User;
  //     return responseJson.data.viewer.User;
  //   });
  // }
  render() {
    const messages = this.state.messages.slice(0);
    messages.reverse();
    return (
      <div className={styles.root}>
        <div className={styles.messagesWrap}>
          {messages.map(message =>
            <Message message={message} />
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
    );
  }
}
