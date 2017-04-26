import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import Locality from '../Locality';

class TripLocality extends Component {
  static propTypes = {
    tripLocality: PropTypes.object.isRequired
  };

  render() {
    return (<Locality locality={this.props.tripLocality.originLocality} />);
  }
}

export default Relay.createContainer(TripLocality, {
  fragments: {
    tripLocality: () => Relay.QL`
      fragment on TripLocality {
        id
        originLocality {
          id
          ${Locality.getFragment('locality')}
        }
      }
    `
  }
});
