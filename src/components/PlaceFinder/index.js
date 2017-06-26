import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-mdl';

import { extendClassName } from 'libs/component';

import styles from './PlaceFinder.scss';

export default class PlaceFinder extends Component {
  static propTypes = {
    places: PropTypes.array.isRequired,
    onAddPlace: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.places,
    };
    this.onAddPlace = this.onAddPlace.bind(this);
  }

  onAddPlace(localityId, name) {
    this.props.onAddPlace(localityId, name);
    this.setState({ results: [] });
  }
  render() {
    const { results } = this.state;
    console.log('PlaceFinder', results);
    return (
      <div className={extendClassName(this.props, styles.root)}>
        {(results.length > 0) &&
          <div className={styles.localitieResults}>
            {results.map(node =>
              <Button
                key={node.id}
                className={styles.localityWrapper}
                onClick={this.onAddPlace.bind(this, node.id, node.name)}
              >
                {node.previewPhotoUrl &&
                  <img src={`${node.previewPhotoUrl.replace('%s', '_150_square')}`} alt={node.name} />
                }
                <div className={styles.localityDetail}>
                  <p className={styles.localityName}>{node.name}</p>
                  <p className={styles.localityAddress}>{node.description}</p>
                </div>
              </Button>
            )}
          </div>
        }
      </div>
    );
  }
}
