import React from 'react';
import PropTypes from 'prop-types';

import Timeline from 'components/Timeline';

import Greeting from './components/Greeting';
import UserInfo from './components/UserInfo';
import Suggestion from './components/Suggestion';
import styles from './Home.scss';

export default class Home extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const { user } = this.props.viewer;

    if (!this.props.viewer.user) {
      return (<Greeting />);
    }

    let suggestUsers = [];
    if (this.props.viewer.suggestFollows) {
      suggestUsers = this.props.viewer.suggestFollows.edges;
    }

    return (
      <div className={`${styles.root} clearfix`}>
        <div className={styles.leftColumn}>
          <UserInfo user={user} />
        </div>
        <div className={styles.content}>
          {suggestUsers.length > 0 &&
            <Suggestion users={suggestUsers} />
          }
          <Timeline />
        </div>
      </div>
    );
  }
}
