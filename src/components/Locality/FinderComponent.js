import React from 'react';
import { Textfield } from 'react-mdl';
import PropTypes from 'prop-types';

export default class LocalityFinder extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: 'localityFinder'
  };

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      placesService: null,
      places: []
    };

    this.onLocalityChange = this.onLocalityChange.bind(this);
  }

  componentDidMount() {
    this.handleLoaded(window.google.maps);
  }

  onLocalityChange(event) {
    this.setState({ query: event.target.value });

    const request = {
      query: event.target.value,
      type: 'locality'
    };
    this.state.placesService.textSearch(request, (results, status) => {
      console.log(results);
      console.log('-----');
      console.log(status);
    });
  }

  handleLoaded(googleMaps) {
    this.setState({
      placesService: new googleMaps.places.PlacesService(document.createElement('div'))
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        <Textfield
          onChange={this.onLocalityChange}
          label='Enter State, County, City...'
          floatingLabel
        />
      </div>
    );
  }
}
