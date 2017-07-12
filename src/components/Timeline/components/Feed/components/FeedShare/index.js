import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import FeedHeader from 'components/FeedHeader';
import Attachment from 'components/Attachment';

import styles from './FeedShare.scss';

class FeedShare extends Component {
  static propTypes = {
    parent: PropTypes.object.isRequired,
  };

  render() {
    const { parent } = this.props;
    return (
      <div className={styles.root}>
        {parent.__typename === 'Trip' &&
          <Link key={parent.id} className={styles.trip} to={`/trip/${parent.id}`}>
            <img src={parent.previewPhotoUrl.replace('%s', '')} alt='Trip Cover' />
            <div className={styles.tripDetail}>
              <p>{parent.name}</p>
            </div>
          </Link>
        }
        {parent.__typename === 'Feed' &&
          <div>
            <FeedHeader
              user={parent.from}
              timestamp={parent.createdAt}
              privacy={parent.privacy}
              placeName={parent.placeName}
              placeId={parent.placeId}
            />
            <p className={styles.status}>{parent.text}</p>
            {parent.attachments.edges.length > 0 &&
              <div className={styles.attachmentWrapper}>
                {parent.attachments.edges.length === 1 &&
                  <Attachment
                    className={styles.attachment}
                    attachment={parent.attachments.edges[0].node}
                    singlePhoto
                    feed={parent}
                  />
                }

                {parent.attachments.edges.length > 1 &&
                  parent.attachments.edges.map(edge =>
                    <Attachment
                      key={edge.cursor}
                      className={styles.attachment}
                      attachment={edge.node}
                      feed={parent}
                    />
                  )
                }
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default Relay.createContainer(FeedShare, {
  fragments: {
    parent: () => Relay.QL`
      fragment on ObjectType {
        __typename
        ... on Trip {
          id
          name
          previewPhotoUrl
        }
        ... on Feed {
          id
          text
          privacy
          createdAt
          isLiked
          placeId
          placeName
          from {
            ... on User {
              id
              username
              fullName
              profilePicUrl
            }
          }
          statistics {
            likeCount
            shareCount
            commentCount
          }
          attachments(first: 5) {
            edges {
              cursor
              node {
                ... on Photo {
                  id
                  previewUrl
                  caption
                }
                ... on Video {
                  id
                  previewUrl
                  caption
                }
                ${Attachment.getFragment('attachment')}
              }
            }
          }
        }
      }
    `
  }
});
