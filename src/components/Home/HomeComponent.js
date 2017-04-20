import React from 'react';
import Relay from 'react-relay';
import { Button } from 'react-mdl';
import PropTypes from 'prop-types';
import styles from './Home.scss';
import Greeting from './Greeting/GreetingComponent';

import AddTripMutation from '../../mutations/Trip/AddTripMutation';

export default class Home extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  }

  onAddTrip = (event) => {
    event.preventDefault();

    const title = 'Our Trip 2017';

    const addTripMutation = new AddTripMutation({
      title
    });

    Relay.Store.commitUpdate(
      addTripMutation,
      {
        onSuccess: (response) => {
          if (response.addTrip) {
            const addTripPayload = response.addTrip;
            if (addTripPayload.trip) {
              this.context.router.push(`/trip/${addTripPayload.trip.id}`);
            }
          }

          return false;
        }
      }
    );
  }

  render() {
    if (!this.props.viewer.user) {
      return (<Greeting />);
    }

    return (
      <div className={styles.root}>
        <Button onClick={this.onAddTrip} raised colored ripple style={{ color: '#EEE' }}>New Trip</Button>
      </div>
    );
  }
}
