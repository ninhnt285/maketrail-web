import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';

import { extendClassName } from 'libs/component';

import styles from './VenueFinder.scss';

class VenueFinder extends Component {
  static propTypes = {
    localityId: PropTypes.string.isRequired,
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    onAddVenue: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.loadingQuery = false;
    this.query = '';
    this.oldQuery = '';

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onAddVenue = this.onAddVenue.bind(this);
  }

  onQueryChange(event) {
    this.query = event.target.value;
    if (this.query === '') {
      this.forceUpdate();
    }

    if (!this.loadingQuery && (this.query !== '') && (this.query !== this.oldQuery)) {
      const _that = this;
      this.loadingQuery = true;
      this.oldQuery = this.query;
      this.props.relay.setVariables(
        {
          query: this.query,
          localityId: this.props.localityId,
          searchVenue: true
        },
        (readyState) => {
          if (readyState.done || readyState.aborted || readyState.error) {
            _that.loadingQuery = false;
            _that.forceUpdate();
            _that.onQueryChange({ target: { value: _that.query } });
          }
        }
      );
    }
  }

  onAddVenue(venueId) {
    this.venueInput.inputRef.value = '';
    this.props.onAddVenue(venueId);
    this.query = '';
    this.forceUpdate();
  }

  render() {
    let results = [];
    if ((this.props.viewer.searchVenue) && (this.query !== '')) {
      results = this.props.viewer.searchVenue.edges;
    }

    const className = extendClassName(this.props, styles.venueFinder);

    return (
      <div className={className}>
        <Textfield
          ref={(c) => { this.venueInput = c; }}
          onChange={this.onQueryChange}
          label='Enter a place name...'
          floatingLabel
        />

        {(results.length > 0) &&
          <div className={styles.results}>
            {results.map(edge =>
              <Button
                key={edge.node.id}
                className={styles.venueWrapper}
                onClick={this.onAddVenue.bind(this, edge.node.id)}
              >
                {edge.node.previewPhotoUrl &&
                  <img src={`${edge.node.previewPhotoUrl.replace('%s', '_150_square')}`} alt={edge.node.name} />
                }
                <div className={styles.venueDetail}>
                  <p className={styles.venueName}>{edge.node.name}</p>
                  <p className={styles.venueAddress}>{edge.node.address}</p>
                </div>
              </Button>
            )}
          </div>
        }
      </div>
    );
  }
}

export default Relay.createContainer(VenueFinder, {
  initialVariables: {
    query: '',
    localityId: '',
    searchVenue: false
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        searchVenue(first: 10, query: $query, localityId: $localityId) @include(if: $searchVenue) {
          edges {
            node {
              id
              name
              address
              location {
                lat
                lng
              }
              previewPhotoUrl
            }
          }
        }
      }
    `
  }
});
