import React, { Component } from 'react';
import Relay from 'react-relay';
import { Textfield, Button } from 'react-mdl';
import PropTypes from 'prop-types';
import styles from './LocalityFinder.scss';

class LocalityFinderComponent extends Component {
  static propTypes = {
    className: PropTypes.string,
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    onAddLocality: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);

    this.loadingQuery = false;
    this.query = '';
    this.oldQuery = '';

    this.state = {
      showResult: true
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onAddLocality = this.onAddLocality.bind(this);
  }

  onQueryChange(event) {
    this.query = event.target.value;
    if (this.query === '') {
      this.setState({ showResult: false });
    }

    if ((this.query !== '') && (this.query !== this.oldQuery)) {
      const _that = this;
      if (!this.loadingQuery) {
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
              this.setState({ showResult: true });
              _that.onQueryChange({ target: { value: _that.query } });
            }
          }
        );
      }
    }
  }

  onAddLocality(localityId) {
    this.props.onAddLocality(localityId);
    this.query = '';
    this.setState({ showResult: false });
  }

  render() {
    let results = [];
    if ((this.props.viewer.searchLocality) && (this.query !== '')) {
      results = this.props.viewer.searchLocality.edges;
    }

    let inputText = (
      <Textfield
        onChange={this.onQueryChange}
        label='Enter the name of State, County or City...'
        floatingLabel
      />
    );
    if (!this.state.showResult) {
      inputText = (
        <Textfield
          value=''
          onChange={this.onQueryChange}
          label='Enter the name of State, County or City...'
          floatingLabel
        />
      );
    }

    return (
      <div className={`${styles.root} ${this.props.className}`}>
        {inputText}

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

export default Relay.createContainer(LocalityFinderComponent, {
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
