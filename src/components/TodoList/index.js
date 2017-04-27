import React, { Component } from 'react';
import { IconButton } from 'react-mdl';
import Modal from 'react-modal';
import VenuesManager from '../VenuesManager';
import styles from './TodoList.scss';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.onOpenManager = this.onOpenManager.bind(this);
    this.onCloseManager = this.onCloseManager.bind(this);
  }

  onOpenManager() {
    this.setState({ showModal: true });
  }

  onCloseManager() {
    this.setState({ showModal: false });
  }

  render() {
    const todoItems = [
      {
        id: 'abc1',
        name: 'Statue of Liberty',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Liberty-statue-from-below_cropped.jpg'
      },
      {
        id: 'abc2',
        name: 'Central Park Zoo',
        imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTEDaZXYITG8ieFAPJ4YSUKCA4vK--tq6MNj5VD9zB4k1v_Iu7EypvKaYM89sDmWeppNao'
      },
      {
        id: 'abc3',
        name: 'Time Square',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHMxAQ2ICRjsV3eHysaboyvh1Bsz3_kmoEg3W-S8WKwWubs0_7AmsfyJjBwPtl1vTPg8'
      }
    ];

    return (
      <div className={styles.todoList}>
        <h4>Check-in Places</h4>
        <button onClick={this.onOpenManager} className={styles.manageButton}>Manage</button>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.onCloseManager}
          shouldCloseOnOverlayClick={true}
          contentLabel='Manage Places'
          className='venuesManagerModal'
          style={{
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
            content: {
              backgroundColor: '#e9ebee',
              width: '600px',
              maxWidth: 'calc(100% - 60px)',
              margin: '80px auto 0'
            }
          }}
        >
          <VenuesManager tripLocalityId='AAA' />
        </Modal>

        {todoItems.map(node =>
          <div key={node.id} className={styles.todoItem}>
            <img src={node.imageUrl} alt={node.name} />
            <span>{node.name}</span>
          </div>
        )}
        <div className={styles.recommend}>
          <span className={styles.title}>Recommend:</span>

          <span className={styles.recommendItem}>
            <img src='https://upload.wikimedia.org/wikipedia/en/a/a5/Liberty-statue-from-below_cropped.jpg' alt='Statue of Liberty' />
            <span>Statue of Liberty</span>
          </span>

          <span className={styles.recommendItem}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHMxAQ2ICRjsV3eHysaboyvh1Bsz3_kmoEg3W-S8WKwWubs0_7AmsfyJjBwPtl1vTPg8' alt='Time Square' />
            <span>Time Square</span>
          </span>

          <span className={styles.recommendItem}>
            <img src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTEDaZXYITG8ieFAPJ4YSUKCA4vK--tq6MNj5VD9zB4k1v_Iu7EypvKaYM89sDmWeppNao' alt='Central Park Zoo' />
            <span>Central Park Zoo</span>
          </span>

          <IconButton name='loop' />
        </div>
      </div>
    );
  }
}
