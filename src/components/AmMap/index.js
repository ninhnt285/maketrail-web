/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'ammap3/ammap/ammap.css';
import 'ammap3/ammap/ammap.js';
import 'ammap3/ammap/themes/dark.js';

import { SERVER_RESOURCE_URL } from 'config';

const MAP_CLEARING_PROPS = [
  'dataProvider'
];

const propChangeRequiresMapClear = (oldProps, newProps) =>
  MAP_CLEARING_PROPS.some(key =>
    oldProps[key] !== newProps[key]
  );

export default class AmMap extends Component {
  static propTypes = {
    style: PropTypes.object,
    dataProvider: PropTypes.object,
    onChangeMap: PropTypes.func.isRequired,
    mapLevel: PropTypes.number
  };

  static defaultProps = {
    style: {},
    dataProvider: {
      mapURL: `${SERVER_RESOURCE_URL}/maps/svg/worldLow.svg`,
      getAreasFromMap: true
    },
    mapLevel: 0
  };

  componentDidMount() {
    this.drawMap();
  }

  componentWillReceiveProps(newProps) {
    if (propChangeRequiresMapClear(this.props, newProps)) {
      this.clear();
    }
  }

  componentDidUpdate() {
    this.drawMap();
  }

  componentWillUnmount() {
    this.clear();
  }

  clear() {
    const container = this.mapContainer;

    for (const child of Array.from(container.childNodes)) {
      container.removeChild(child);
    }

    delete this.map;
  }

  drawMap() {
    const {
      dataProvider,
      onChangeMap,
      mapLevel,
      ...props
    } = this.props;

    let map = this.map;

    if (!map) {
      map = this.map = AmCharts.makeChart(this.mapContainer, {
        type: 'map',
        theme: 'dark',
        areasSettings: {
          autoZoom: true,
          selectedColor: '#CC0000'
        },
        dataProvider
      });

      map.addListener("clickMapObject", function(event) {
        if (mapLevel === 0) {
          onChangeMap(event.mapObject.title);
        }
      });

      map.addListener('homeButtonClicked', function(event) {
        onChangeMap();
      });
    } else {
      map.dataProvider = dataProvider;
    }
  }

  render() {
    const style = {
      height: '500px',
      backgroundColor: '#3F3F4F',
      ...this.props.style
    };

    return (
      <div
        id='mapContainer'
        ref={(c) => { this.mapContainer = c; }}
        style={style}
      />
    );
  }
}
