import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SERVER_RESOURCE_URL } from 'config';
import AmMap from 'components/AmMap';
import Timeline from 'components/Timeline';

import styles from './Profile.scss';

export default class ProfileComponent extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      mapURL: `${SERVER_RESOURCE_URL}/maps/svg/worldHigh.svg`,
      mapLevel: 0
    };

    this.onChangeMap = this.onChangeMap.bind(this);
  }

  onChangeMap(map) {
    let mapURL = `${SERVER_RESOURCE_URL}/maps/svg/worldHigh.svg`;
    let mapLevel = 0;

    if (map) {
      let mapName = this.camelize(map.title);
      if (mapName === 'unitedStates') {
        mapName = 'usa';
      }
      mapURL = `${SERVER_RESOURCE_URL}/maps/svg/${mapName}High.svg`;
      mapLevel = 1;
    }

    this.props.relay.setVariables(
      { mapId: map.id },
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

    const { User: user } = this.props.viewer;

    return (
      <div className={styles.root}>
        <AmMap
          style={{ height: '300px' }}
          dataProvider={dataProvider}
          onChangeMap={this.onChangeMap}
          mapLevel={this.state.mapLevel}
        />

        <Timeline parentId={user.id} />
      </div>
    );
  }
}
