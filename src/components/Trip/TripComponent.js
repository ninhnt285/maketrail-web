import React from 'react';
import PropTypes from 'prop-types';
import styles from './Trip.scss';

export default class TripComponent extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className={styles.root}>
        <h1>{this.props.viewer.Trip.name}</h1>
      </div>
    );
  }
}
