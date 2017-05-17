import React, { Component } from 'react';
import AmMap from 'components/AmMap';

import { SERVER_RESOURCE_URL } from 'config';

import styles from './Profile.scss';

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapURL: `${SERVER_RESOURCE_URL}/maps/svg/worldHigh.svg`,
      mapLevel: 0,
      areas: [
        { id: 'US', color: '#67b7dc' },
        { id: 'VN', color: '#67b7dc' },
        { id: 'MY', color: '#67b7dc' },
        { id: 'SG', color: '#67b7dc' }
      ]
    };

    this.onChangeMap = this.onChangeMap.bind(this);
  }

  onChangeMap(mapId) {
    let mapURL = `${SERVER_RESOURCE_URL}/maps/svg/worldHigh.svg`;
    let mapLevel = 0;
    let areas = [
      { id: 'US', color: '#67b7dc' },
      { id: 'VN', color: '#67b7dc' },
      { id: 'MY', color: '#67b7dc' },
      { id: 'SG', color: '#67b7dc' }
    ];

    if (mapId) {
      let mapName = this.camelize(mapId);
      if (mapName === 'unitedStates') {
        mapName = 'usa';
      }
      mapURL = `${SERVER_RESOURCE_URL}/maps/svg/${mapName}High.svg`;
      mapLevel = 1;
      areas = [];
    }

    this.setState({ mapURL, mapLevel, areas });
  }

  camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      (index === 0 ? letter.toLowerCase() : letter.toUpperCase())
    ).replace(/\s+/g, '');
  }

  render() {
    const dataProvider = {
      mapURL: this.state.mapURL,
      areas: this.state.areas,
      getAreasFromMap: true
    };

    return (
      <div className={styles.root}>
        <AmMap
          style={{ height: '300px' }}
          dataProvider={dataProvider}
          onChangeMap={this.onChangeMap}
          mapLevel={this.state.mapLevel}
        />
      </div>
    );
  }
}
