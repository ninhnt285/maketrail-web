import React, { Component } from 'react';
import { Button, Menu, MenuItem } from 'react-mdl';
import PropTypes from 'prop-types';
import Rating from 'react-rating';

import CategoryIcon from 'components/CategoryIcon';

import FeaturedLocations from './components/FeaturedLocations';
import styles from './City.scss';

export default class City extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }
  render() {
    const city = this.props.viewer.Locality;
    console.log(city);

    const trips = [
      { id: '1', name: 'Trip 1' },
      { id: '2', name: 'Trip 2' }
    ];

    const categories = [
      {
        id: '4d4b7104d754a06370d81259',
        name: 'Arts & Entertainment',
        iconUrl: 'https://ss3.4sqi.net/img/categories_v2/arts_entertainment/default_88.png'
      },
      {
        id: '4d4b7105d754a06372d81259',
        name: 'College & University',
        iconUrl: 'https://ss3.4sqi.net/img/categories_v2/education/default_88.png'
      },
      {
        id: '4d4b7105d754a06373d81259',
        name: 'Events',
        iconUrl: 'https://ss3.4sqi.net/img/categories_v2/event/default_88.png'
      },
      {
        id: '4d4b7105d754a06374d81259',
        name: 'Food',
        iconUrl: 'https://ss3.4sqi.net/img/categories_v2/food/default_88.png'
      }
    ];

    return (
      <div className={styles.root}>
        <div className={styles.coverImage}>
          <img src={city.previewPhotoUrl.replace('%s', '')} alt={city.name} />
        </div>

        <div className={styles.content}>
          <Button
            id='insert_to_trip'
            className={styles.addBtn}
            onClick={this.onAddClicked}
            colored
            raised
            ripple
          >
            Insert to Trip
          </Button>
          <Menu target='insert_to_trip'>
            {trips.map(trip =>
              <MenuItem key={trip.id}>{trip.name}</MenuItem>
            )}
          </Menu>

          <h1 className={styles.title}>{city.name}</h1>
          <div className={styles.description}>{city.description}</div>
          <div className={`${styles.detailRow} ${styles.rating}`}>
            <h4>Score: </h4>
            <Rating
              style={{ position: 'relative', top: '-2px' }}
              placeholderRate={3.5}
              empty={<img src={require('assets/rating/star-grey.png')} className='icon' alt='grey_star' />}
              placeholder={<img src={require('assets/rating/star-red.png')} className='icon' alt='red_star' />}
              full={<img src={require('assets/rating/star-yellow.png')} className='icon' alt='yellow_star' />}
            />
            <span style={{ paddingLeft: '5px' }}>(3.5/5.0)</span>
          </div>

          <div className={`${styles.detailRow} ${styles.highlights}`}>
            <h4>Highlights: </h4>
            {categories.map(node =>
              <CategoryIcon key={node.id} category={node} selected />
            )}
          </div>
        </div>

        <FeaturedLocations />
      </div>
    );
  }
}
