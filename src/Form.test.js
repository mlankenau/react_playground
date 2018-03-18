import React from 'react';
import ReactDOM from 'react-dom';
import * as Fields from './Fields';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Fields.TextField />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(true)
});
