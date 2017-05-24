/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datamaps from 'datamaps';

const MAP_CLEARING_PROPS = [
  'height', 'scope', 'setProjection', 'width'
];

const propChangeRequiresMapClear = (oldProps, newProps) =>
  MAP_CLEARING_PROPS.some(key =>
    oldProps[key] !== newProps[key]
  );

export default class Datamap extends Component {
  static propTypes = {
    width: PropTypes.any,
    height: PropTypes.any,

    data: PropTypes.object,
    responsive: PropTypes.bool,
    style: PropTypes.object,
    updateChoroplethOptions: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.resizeMap = this.resizeMap.bind(this);
  }

  componentDidMount() {
    if (this.props.responsive) {
      window.addEventListener('resize', this.resizeMap);
    }
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
    if (this.props.responsive) {
      window.removeEventListener('resize', this.resizeMap);
    }
  }

  clear() {
    const { container } = this.refs;

    for (const child of Array.from(container.childNodes)) {
      container.removeChild(child);
    }

    delete this.map;
  }

  drawMap() {
    const {
      data,
      updateChoroplethOptions,
      onAreaClick,
      ...props
    } = this.props;

    let map = this.map;
    let mapObject = {
      ...props,
      data,
      element: this.refs.container
    };

    if (onAreaClick) {
      mapObject['done'] = (datamap) => {
        datamap.svg.selectAll('.datamaps-subunit')
        .on('click', onAreaClick);
      }
    }

    if (!map) {
      map = this.map = new Datamaps(mapObject);
    } else {
      map.updateChoropleth(data, updateChoroplethOptions);
    }
  }

  resizeMap() {
    this.map.resize();
  }

  render() {
    const style = {
      height: '100%',
      position: 'relation',
      width: '100%',
      ...this.props.style
    };

    return <div ref='container' style={style} />;
  }
}
