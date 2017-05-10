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
      />
    );
  }
}
