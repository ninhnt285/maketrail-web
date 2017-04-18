import React from 'react';
import ReactDOM from 'react-dom';

// import { SERVER_URL } from './config';
import '../node_modules/react-mdl/extra/material';

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

ReactDOM.render(
  <b>Welcome to MakeTrail.com</b>,
  rootNode
);
