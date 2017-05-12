import React, { Component } from 'react';
import DataMap from 'components/DataMap';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        USA: { fillKey: 'traveledTo' },
        VNM: { fillKey: 'traveledTo' },
        SGP: { fillKey: 'traveledTo' },
        MYS: { fillKey: 'traveledTo' }
      }
    };

    this.onAreaClick = this.onAreaClick.bind(this);
  }

  onAreaClick(geography) {
    return geography;
  }

  render() {
    return (
      <DataMap
        data={this.state.data}
        fills={{
          defaultFill: '#abdda4',
          traveledTo: '#fa0fa0'
        }}
        projection='mercator'
        responsive
        onAreaClick={this.onAreaClick}
      />
    );
  }
}
