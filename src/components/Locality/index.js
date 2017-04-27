import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import styles from './Locality.scss';
import CategoryIcon from '../CategoryIcon';

class Locality extends Component {
  static propTypes = {
    locality: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  };

  render() {
    const { locality } = this.props;
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

    const todoItems = [
      {
        id: 'abc1',
        name: 'Check-in at Statue of Liberty',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Liberty-statue-from-below_cropped.jpg'
      },
      {
        id: 'abc2',
        name: 'Central Park Zoo',
        imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTEDaZXYITG8ieFAPJ4YSUKCA4vK--tq6MNj5VD9zB4k1v_Iu7EypvKaYM89sDmWeppNao'
      },
      {
        id: 'abc3',
        name: 'Check-in at Timesquare',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHMxAQ2ICRjsV3eHysaboyvh1Bsz3_kmoEg3W-S8WKwWubs0_7AmsfyJjBwPtl1vTPg8'
      }
    ];

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <img
            className={styles.previewPhoto}
            src={`${locality.previewPhotoUrl.replace('%s', '_150_square')}`}
            alt={locality.name}
          />
          <div className={styles.detail}>
            <h3 className={styles.title}>#{this.props.index + 1} {locality.name}</h3>
            <p className={styles.description}>{locality.description}</p>
            <div className={`${styles.detailRow} ${styles.rating}`}>
              <h4>Score: </h4>
              <Rating
                style={{ position: 'relative', top: '-2px' }}
                placeholderRate={3.5}
                empty={<img src={require('../../assets/rating/star-grey.png')} className='icon' alt='grey_star' />}
                placeholder={<img src={require('../../assets/rating/star-red.png')} className='icon' alt='red_star' />}
                full={<img src={require('../../assets/rating/star-yellow.png')} className='icon' alt='yellow_star' />}
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
        </div>
        <div className={styles.content}>
          <div className={styles.todoList}>
            <h4>To-do List</h4>
            <button>Add More</button>
            {todoItems.map(node =>
              <div key={node.id} className={styles.todoItem}>
                <img src={node.imageUrl} alt={node.name} />
                <span>{node.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Locality, {
  fragments: {
    locality: () => Relay.QL`
      fragment on Locality {
        id
        name
        description
        location {
          lat
          lng
        }
        previewPhotoUrl
      }
    `
  }
});
