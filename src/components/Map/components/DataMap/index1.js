import React, { Component } from 'react';
import Datamaps from 'datamaps';

const MAP_CLEARING_PROPS = ['height', 'scope', 'setProjection', 'width'];

const propChangeRequiresMapClear = (oldProps, newProps) =>
MAP_CLEARING_PROPS.some(key => oldProps[key] !== newProps[key]);

export default class Datamap extends Component {
	static propTypes = {
    height: React.PropTypes.any,
    width: React.PropTypes.any,
		arc: React.PropTypes.array,
		arcOptions: React.PropTypes.object,
		bubbleOptions: React.PropTypes.object,
		bubbles: React.PropTypes.array,
		data: React.PropTypes.object,
		graticule: React.PropTypes.bool,
		labels: React.PropTypes.bool,
		responsive: React.PropTypes.bool,
		style: React.PropTypes.object,
		updateChoroplethOptions: React.PropTypes.object
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
			arc,
			arcOptions,
			bubbles,
			bubbleOptions,
			data,
			graticule,
			labels,
			updateChoroplethOptions,
			...props
		} = this.props;

		let map = this.map;

		if (!map) {
			map = this.map = new Datamaps({
				...props,
				data,
				element: this.refs.container
			});
		} else {
			map.updateChoropleth(data, updateChoroplethOptions);
		}

		if (arc) {
			map.arc(arc, arcOptions);
		}

		if (bubbles) {
			map.bubbles(bubbles, bubbleOptions);
		}

		if (graticule) {
			map.graticule();
		}

		if (labels) {
			map.labels();
		}
	}

	resizeMap() {
		this.map.resize();
	}

	render() {
		const style = {
			height: '100%',
			position: 'relative',
			width: '100%',
			...this.props.style
		};

		return <div ref="container" style={style} />;
	}

}
