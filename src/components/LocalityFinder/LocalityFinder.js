import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';

import { extendClassName } from 'libs/component';

import styles from './LocalityFinder.scss';

class LocalityFinder extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    onAddLocality: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.loadingQuery = false;
    this.query = '';
    this.oldQuery = '';

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onAddLocality = this.onAddLocality.bind(this);
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
          searchLocality: true
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

  onAddLocality(localityId) {
    this.localityInput.inputRef.value = '';
    this.props.onAddLocality(localityId);
    this.query = '';
    this.forceUpdate();
  }

  render() {
    let results = [];
    if ((this.props.viewer.searchLocality) && (this.query !== '')) {
      results = this.props.viewer.searchLocality.edges;
    }

    return (
      <div className={extendClassName(this.props, styles.root)}>
        <Textfield
          ref={(c) => { this.localityInput = c; }}
          onChange={this.onQueryChange}
          label='Enter a City...'
          floatingLabel
        />

        {(results.length > 0) &&
          <div className={styles.localitieResults}>
            {results.map(edge =>
              <Button
                key={edge.node.id}
                className={styles.localityWrapper}
                onClick={this.onAddLocality.bind(this, edge.node.id)}
              >
                {edge.node.previewPhotoUrl &&
                  <img src={`${edge.node.previewPhotoUrl.replace('%s', '_150_square')}`} alt={edge.node.name} />
                }
                <div className={styles.localityDetail}>
                  <p className={styles.localityName}>{edge.node.name}</p>
                  <p className={styles.localityAddress}>{edge.node.description}</p>
                </div>
              </Button>
            )}
          </div>
        }
      </div>
    );
  }
}

export default Relay.createContainer(LocalityFinder, {
  initialVariables: {
    query: '',
    searchLocality: false
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        searchLocality(first: 10, query: $query) @include(if: $searchLocality) {
          edges {
            node {
              id
              name
              description
              previewPhotoUrl
            }
          }
        }
      }
    `
  }
});
