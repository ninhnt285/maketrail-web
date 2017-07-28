import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserFullName from 'components/UserFullName';

import styles from './Notify.scss';

export default class Notify extends Component {
  static propTypes = {
    notify: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      isShowNotify: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isShowNotify: true });
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.setState({ isShowNotify: false });
    }, 3000);
  }
  render() {
    const { notify } = this.props;
    if ((notify === null) || (!this.state.isShowNotify)) {
      return null;
    }
    return (
      <div className={styles.root} ref={(div) => { this.notifyWrap = div; }}>
        <UserFullName className={styles.userName} userId={notify.from} />
        <div className={styles.message}> {notify.message}</div>
      </div>
    );
  }
}
