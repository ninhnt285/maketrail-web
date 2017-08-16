import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Button } from 'react-mdl';
import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import gasStationIconUrl from 'assets/gas_station.png';
import restaurantIconUrl from 'assets/restaurant.png';
import locationIconUrl from 'assets/location.png';

import styles from './Map.scss';

const apiKey = 'AIzaSyDHqGmrK5roOzXyAffBuMT0JwdEZtwG-LM';
const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=${apiKey}`;

export default class Map extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    localities: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    const markers = [];
    const cords = [];
    props.localities.map((locality) => {
      const originLocality = locality.node.originLocality;
      const marker = { position: originLocality.location, icon: locationIconUrl };
      markers.push(marker);
      cords.push({ lat: originLocality.location.lat, lng: originLocality.location.lng });
      return false;
    });
    this.state = {
      activeLocality: -1,
      markers,
      cords,
    };
  }
  onChangeLocality(index) {
    this.props.relay.setVariables({
      lat: this.props.localities[index].node.originLocality.location.lat,
      lng: this.props.localities[index].node.originLocality.location.lng,
      search: true,
    });
    this.setState({ activeLocality: index });
  }
  render() {
    const { localities } = this.props;
    const { searchGasStation, searchRestaurant } = this.props.viewer;
    const { activeLocality, cords } = this.state;
    const markers = this.state.markers;
    let centerLat = (localities.length === 0) ? 38.9806016 : 0;
    let centerLng = (localities.length === 0) ? -107.8005045 : 0;
    localities.map((locality) => {
      const originLocality = locality.node.originLocality;
      centerLat += originLocality.location.lat;
      centerLng += originLocality.location.lng;
      return false;
    });
    if (localities.length > 0) {
      centerLat /= localities.length;
      centerLng /= localities.length;
    }
    if (activeLocality >= 0) {
      centerLat = localities[activeLocality].node.originLocality.location.lat;
      centerLng = localities[activeLocality].node.originLocality.location.lng;
    }
    if (searchGasStation) {
      searchGasStation.splice(5);
      searchGasStation.map((gasStation) => {
        const marker = { position: { lat: gasStation.lat, lng: gasStation.lng }, icon: gasStationIconUrl };
        markers.push(marker);
        return false;
      });
    }
    if (searchRestaurant) {
      searchRestaurant.splice(5);
      searchRestaurant.map((gasStation) => {
        const marker = { position: { lat: gasStation.lat, lng: gasStation.lng }, icon: restaurantIconUrl };
        markers.push(marker);
        return false;
      });
    }
    const GoogleMapWrap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultZoom={(activeLocality >= 0) ? 12 : 5}
        defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
      >
        {props.markers.map(marker => (
          <Marker
            {...marker}
            icon={marker.icon}
          />
        ))}
        <Polyline
          path={props.cords}
          options={{ strokeColor: '#FF0000', strokeOpacity: 0.6, strokeWeight: 4 }}
        />
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
          cords={cords}
          center={{ lat: centerLat, lng: centerLng }}
        />
        <List className={styles.listLocality}>
          {localities.map((locality, index) =>
            <ListItem key={locality.node.id} className={styles.locality}>
              <Button colored={(index === activeLocality)} onClick={() => this.onChangeLocality(index)} className={styles.localityButton}>
                {locality.node.originLocality.name}
              </Button>
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}
