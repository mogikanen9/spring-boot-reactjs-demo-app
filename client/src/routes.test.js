import React from 'react';
import ReactDOM from 'react-dom';
import {routes, authorList} from './routes';

it('routes component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(routes, div);
});

it('authorList without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(authorList, div);
});

