import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styles from './Modal.scss';

export default class Modal extends Component {
  static propTypes = {
    showModal: PropTypes.bool,
    onCloseModal: PropTypes.func,
    children: PropTypes.object.isRequired,
    title: PropTypes.string,
    isShowAttachment: PropTypes.bool,
  };

  static defaultProps = {
    showModal: false,
    title: null,
    isShowAttachment: false,
    onCloseModal: () => {}
  };

  render() {
    return (
      <ReactModal
        isOpen={this.props.showModal}
        onRequestClose={this.props.onCloseModal}
        shouldCloseOnOverlayClick={true}
        contentLabel='Change Date'
        className={styles.maketrailModal}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          content: {
            backgroundColor: this.props.isShowAttachment ? 'white' : '#e9ebee',
            width: this.props.isShowAttachment ? '800px' : '600px',
            maxWidth: 'calc(100% - 60px)',
            margin: '80px auto 0'
          }
        }}
      >
        {this.props.title &&
          <h1 className={styles.title}>{this.props.title}</h1>
        }
        <div className={styles.content} style={{ paddingTop: this.props.title ? '50px' : '10px' }}>
          {this.props.children}
        </div>
      </ReactModal>
    );
  }
}
