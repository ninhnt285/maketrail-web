import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-mdl';
import styles from './CategoryIcon.scss';

export default class CategoryIcon extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    selected: PropTypes.bool
  };

  static defaultProps = {
    selected: false
  }

  render() {
    const { category } = this.props;
    const selected = this.props.selected ? ' selected' : '';

    return (
      <span className={`${styles.root}${selected}`}>
        <Tooltip label={category.name} position='top'>
          <img src={category.iconUrl} alt={category.name} />
        </Tooltip>
      </span>
    );
  }
}
