import React from 'react';
// import styles from './Home.scss';
import Greeting from './Greeting/GreetingComponent';

export default class Home extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (<Greeting />);
  }
}
