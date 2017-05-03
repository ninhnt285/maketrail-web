import React from 'react';
import { Grid, Cell, Button } from 'react-mdl';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import coverPhoto from 'assets/trip-cover/cover2.jpg';
import styles from './Home.scss';
import Greeting from './Greeting/GreetingComponent';

import AddTripMutation from '../../mutations/Trip/AddTripMutation';

export default class Home extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

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
            if (addTripPayload.edge) {
              this.context.router.push(`/trip/${addTripPayload.edge.node.id}`);
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

    const trips = this.props.viewer.allTrips.edges;

    return (
      <div className={styles.root}>
        <Button onClick={this.onAddTrip} raised colored ripple style={{ color: '#EEE', margin: '0 0 15px' }}>New Trip</Button>
        <Grid className={styles.trips}>
          {trips.map(edge =>
            <Cell key={edge.node.id} col={6} tablet={4} phone={4}>
              <Link className={styles.trip} to={`/trip/${edge.node.id}`}>
                <img src={coverPhoto} alt='Trip Cover' />
                <div className={styles.tripDetail}>
                  <p>{edge.node.name}</p>
                </div>
              </Link>
            </Cell>
          )}
        </Grid>
      </div>
    );
  }
}
