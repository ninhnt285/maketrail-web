import React from 'react';
import { Grid, Cell, Card, Button } from 'react-mdl';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
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
      <Grid className={styles.root}>
        {trips.map(edge =>
          <Cell key={edge.node.id} col={12}>
            <Link to={`/trip/${edge.node.id}`}>
              <Card className={styles.trip}>
                <p>{edge.node.name}</p>
              </Card>
            </Link>
          </Cell>
        )}
        <Button onClick={this.onAddTrip} raised colored ripple style={{ color: '#EEE' }}>New Trip</Button>
      </Grid>
    );
  }
}
