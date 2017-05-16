import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import { extendClassName, extendStyle } from 'libs/component';

import styles from './Attachment.scss';

class Attachment extends Component {
  static propTypes = {
    attachment: PropTypes.object.isRequired,
    singlePhoto: PropTypes.bool
  };

  static defaultProps = {
    singlePhoto: false
  };

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
      >
        <img
          src={singlePhoto ? attachment.filePathUrl.replace('%s', '') : attachment.previewUrl.replace('%s', '_500_square')}
          alt={attachment.name}
        />
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
