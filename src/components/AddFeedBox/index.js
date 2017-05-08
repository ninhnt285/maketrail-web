import React, { Component } from 'react';
import { Textfield, Button } from 'react-mdl';
import Dropzone from 'react-dropzone';

import styles from './AddFeedBox.scss';

export default class AddFeedBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles) {
    this.setState({ files: acceptedFiles });
  }

  render() {
    return (
      <div className={styles.root}>
        <Textfield
          onChange={() => {}}
          label="What's on your mind?"
          rows={2}
          style={{ width: '100%' }}
        />
        {this.state.files.length > 0 &&
          <div className={styles.previewWrapper}>
            {this.state.files.map(file =>
              <img
                key={file.name}
                src={file.preview}
                alt={file.name}
              />
            )}
          </div>
        }
        <Dropzone className={styles.uploadArea} onDrop={this.onDrop}>
          <Button colored raised ripple>Photo/Video</Button>
        </Dropzone>
        <Button colored raised ripple>Check in</Button>
      </div>
    );
  }
}
