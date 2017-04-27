import React, { Component } from 'react';
import { Textfield } from 'react-mdl';
import styles from './VenueFinder.scss';

export default class VenueFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    if (event.target.value === '') {
      this.setState({ results: [] });
    } else {
      this.setState({
        results: [
          {
            id: 'abc4',
            name: 'Time Square',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHMxAQ2ICRjsV3eHysaboyvh1Bsz3_kmoEg3W-S8WKwWubs0_7AmsfyJjBwPtl1vTPg8'
          }
        ]
      });
    }
  }

  render() {
    return (
      <div className={styles.venueFinder}>
        <Textfield
          label='Enter a venue...'
          floatingLabel
          onChange={this.onInputChange}
        />

        {(this.state.results.length > 0) &&
          <div className={styles.results}>
            {this.state.results.map(node =>
              <div key={node.id} className={styles.venue}>
                <img src={node.imageUrl} alt={node.name} />
                <span>{node.name}</span>
              </div>
            )}
          </div>
        }
      </div>
    );
  }
}
