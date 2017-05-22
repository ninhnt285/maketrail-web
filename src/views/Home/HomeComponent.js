import React from 'react';
import PropTypes from 'prop-types';

import Timeline from 'components/Timeline';

import Greeting from './components/Greeting';
import MyTrips from './components/MyTrips';
import styles from './Home.scss';

export default class Home extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    if (!this.props.viewer.user) {
      return (<Greeting />);
    }

    return (
      <div className={`${styles.root} clearfix`}>
        <div className={styles.leftColumn}>
          <MyTrips trips={this.props.viewer.allTrips.edges} />
        </div>
        <div className={styles.content}>
          <Timeline />
        </div>
      </div>
    );
  }
}
