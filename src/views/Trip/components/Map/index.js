import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

import styles from './Map.scss';

export default class Map extends Component {
  static propTypes = {
    // tripId: PropTypes.string.isRequired,
    localities: PropTypes.array.isRequired,
  }
  initMap() {

  }
  render() {
    const { localities } = this.props;
    let centerLat = (localities.length > 0) ? 0 : 38.9806016;
    let centerLng = (localities.length > 0) ? 0 : -107.8005045;
    const markers = [];
    // const bounds = new google.maps.LatLngBounds();
    localities.map((locality) => {
      const originLocality = locality.node.originLocality;
      centerLng += originLocality.location.lng;
      centerLat += originLocality.location.lat;
      const marker = { position: originLocality.location, key: originLocality.name };
      markers.push(marker);
      // bounds.extends(marker);
      return false;
    });
    if (localities.length > 0) {
      centerLat /= localities.length;
      centerLng /= localities.length;
    }
    const apiKey = 'AIzaSyDHqGmrK5roOzXyAffBuMT0JwdEZtwG-LM';
    const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=${apiKey}`;
    const GoogleMapWrap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: centerLat, lng: centerLng }}
      >
        {props.markers.map(marker => (
          <Marker {...marker} />
        ))}
      </GoogleMap>
    )));
    return (
      <div className={styles.root}>
        <GoogleMapWrap
          googleMapURL={googleMapURL}
          containerElement={
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          loadingElement={
            <div style={{ height: '100%' }}>
              Loading map
            </div>
          }
          markers={markers}
        />
      </div>
    );
  }
}
