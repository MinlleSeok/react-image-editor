/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageEditor from './ImageEditorContainer';

configure({ adapter: new Adapter() });

it('should pass addTodo action to child component', () => {
  const width = 500;
  const height = 500;
  const component = shallow(
    <ImageEditor />,
  ).first();


});
