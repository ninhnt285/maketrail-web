import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
// import { extendClassName, extendStyle } from 'libs/component';
import AddAttachmentMutation from 'mutations/Attachment/AddAttachmentMutation';

import styles from './UploadAttachment.scss';

class UploadAttachment extends Component {
  static propTypes = {
    onUploaded: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    children: PropTypes.object,
    onDrop: PropTypes.func,
    // accept: PropTypes.string,
  };

  static defaultProps = {
    multiple: true,
    children: null,
    onDrop: null,
    // accept: null,
  };
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(acceptedFiles) {
    const { props } = this;
    if (typeof this.props.onDrop === 'function') {
      this.props.onDrop();
    }
    acceptedFiles.map((file) => {
      const addAttachmentMutation = new AddAttachmentMutation({
        file
      });
      Relay.Store.commitUpdate(
        addAttachmentMutation,
        {
          onSuccess: (response) => {
            if ((response.addAttachment) && (response.addAttachment.attachment)) {
              props.onUploaded(response.addAttachment.attachment);
            }
          }
        }
      );
      return true;
    });
  }
  onUploaded(attachment) {
    this.props.onUploaded(attachment);
  }
  render() {
    return (
      <Dropzone className={styles.root} multiple={this.props.multiple} onDrop={this.onDrop}>
        {this.props.children}
      </Dropzone>
    );
  }
}

export default UploadAttachment;
