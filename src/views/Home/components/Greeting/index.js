import React from 'react';
import './Greeting.scss';

export default class GreetingComponent extends React.Component {
  render() {
    return (
      <div className='banner-section mdl-typography--text-center'>
        <div className='logo-font linesol-slogan'>
          Change the ways how you explore new places and share your trips.
        </div>
      </div>
    );
  }
}
