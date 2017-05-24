import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import { extendStyle, extendClassName } from 'libs/component';
import { SERVER_RESOURCE_URL } from 'config';
import AmMap from './components/AmMap';

class Map extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      mapURL: `${SERVER_RESOURCE_URL}/maps/svg/worldHigh.svg`,
      mapLevel: 0
    };

    this.onChangeMap = this.onChangeMap.bind(this);
  }

  onChangeMap(map) {
    let mapURL = `${SERVER_RESOURCE_URL}/maps/svg/worldHigh.svg`;
    let mapLevel = 0;
    let mapId = null;

    if (map) {
      let mapName = this.camelize(map.title);
      if (mapName === 'unitedStates') {
        mapName = 'usa';
      }
      mapURL = `${SERVER_RESOURCE_URL}/maps/svg/${mapName}High.svg`;
      mapLevel = 1;
      mapId = map.id;
    }

    this.props.relay.setVariables(
      { mapId },
      () => {
        this.setState({ mapURL, mapLevel });
      }
    );
  }

  getAreaData() {
    const areaColors = ['#999999', '#0000FF', '#67b7dc'];
    return this.props.viewer.mapAreas.map(area => ({
      id: area.code,
      color: areaColors[area.status]
    }));
  }

  camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      (index === 0 ? letter.toLowerCase() : letter.toUpperCase())
    ).replace(/\s+/g, '');
  }

  render() {
    const dataProvider = {
      mapURL: this.state.mapURL,
      areas: this.getAreaData(),
      getAreasFromMap: true
    };

    return (
      <AmMap
        className={extendClassName(this.props)}
        style={extendStyle(this.props, { height: '300px' })}
        dataProvider={dataProvider}
        onChangeMap={this.onChangeMap}
        mapLevel={this.state.mapLevel}
      />
    );
  }
}

export default Relay.createContainer(Map, {
  initialVariables: {
    userId: null,
    mapId: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        mapAreas(id: $mapId, userId: $userId) {
          code
          name
          status
        }
      }
    `
  }
});
