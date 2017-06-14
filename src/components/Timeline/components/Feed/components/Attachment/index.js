import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import { extendClassName, extendStyle } from 'libs/component';

import Modal from 'components/Modal';
import styles from './Attachment.scss';

class Attachment extends Component {
  static propTypes = {
    attachment: PropTypes.object.isRequired,
    singlePhoto: PropTypes.bool,
  };

  static defaultProps = {
    singlePhoto: false,
  };
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }
  render() {
    const { attachment, singlePhoto } = this.props;
    let defaultStyle = {};
    if (singlePhoto) {
      defaultStyle = { width: '100%', height: 'auto' };
    }

    return (
      <button
        style={extendStyle(this.props, defaultStyle)}
        className={extendClassName(this.props, styles.root)}
        onClick={() => this.showModal()}
      >
        <img
          src={singlePhoto ? attachment.filePathUrl.replace('%s', '') : attachment.previewUrl.replace('%s', '_500_square')}
          alt={attachment.name}
        />
        <Modal
          showModal={this.state.showModal}
          onCloseModal={() => this.hideModal()}
          title={attachment.name}
        >
          <img src={attachment.filePathUrl.replace('%s', '')} alt={attachment.name} />
        </Modal>
      </button>
    );
  }
}

export default Relay.createContainer(Attachment, {
  fragments: {
    attachment: () => Relay.QL`
      fragment on Attachment {
        __typename
        ... on Photo {
          id
          name
          caption
          previewUrl
          filePathUrl
        }

        ... on Video {
          id
          name
          caption
          previewUrl
          filePathUrl
        }
      }
    `
  }
});
