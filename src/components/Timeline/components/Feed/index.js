import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import FeedHeader from './components/FeedHeader';
import Attachment from './components/Attachment';
import styles from './Feed.scss';

class Feed extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired
  };

  render() {
    const { feed } = this.props;
    const attachments = feed.attachments.edges;

    return (
      <div className={styles.root}>
        <FeedHeader
          user={feed.from}
          timestamp={feed.createdAt}
          privacy={feed.privacy}
        />
        <p className={styles.status}>{feed.text}</p>
        {attachments.length > 0 &&
          <div className={styles.attachmentWrapper}>
            {attachments.length === 1 &&
              <Attachment
                className={styles.attachment}
                attachment={attachments[0].node}
                singlePhoto
              />
            }

            {attachments.length > 1 &&
              attachments.map(edge =>
                <Attachment
                  key={edge.cursor}
                  className={styles.attachment}
                  attachment={edge.node}
                />
              )
            }
          </div>
        }
      </div>
    );
  }
}

export default Relay.createContainer(Feed, {
  fragments: {
    feed: () => Relay.QL`
      fragment on Feed {
        id
        text
        privacy
        createdAt
        from {
          ... on User {
            id
            username
            fullName
            profilePicUrl
          }
        }
        attachments(first: 100) {
          edges {
            cursor
            node {
              ${Attachment.getFragment('attachment')}
            }
          }
        }
      }
    `
  }
});
