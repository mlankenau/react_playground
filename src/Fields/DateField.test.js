import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {DateField} from './DateField'
import { shallow, mount } from 'enzyme'
import {} from '../TestSetup'

it('renders a date in display mode', () => {
  const wrapper = mount(<DateField edit={false} value={'2014-05-11'}/>)
  expect(wrapper.find('div').text()).toBe('11.05.2014')
});

it('renders null in display mode', () => {
  const wrapper = mount(<DateField edit={false} value={null}/>)
  expect(wrapper.find('div').text()).toBe('')
});

it('renders a date field in edit mode', () => {
  const wrapper = mount(<DateField edit={true} value={'2014-05-11'}/>)
  expect(wrapper.find('input').prop('value')).toBe('11.05.2014')
});

it('renders null in edit mode', () => {
  const wrapper = mount(<DateField edit={true} value={null}/>)
  expect(wrapper.find('input').prop('value')).toBe('')
});

it('valid change', () => {
  const mockOnChange = jest.fn();
  const wrapper = mount(<DateField edit={true} value={'11.05.2014'} onChange={mockOnChange}/>)
  wrapper.find('input').simulate('change', { target: { value: '12.06.2015' }})
  expect(mockOnChange).toHaveBeenCalledWith('2015-06-12');
});

it('invalid change', () => {
  const mockOnChange = jest.fn();
  const wrapper = mount(<DateField edit={true} value={'123'} onChange={mockOnChange}/>)
  wrapper.find('input').simulate('change', { target: { value: '456a' }})
  expect(mockOnChange.mock.calls.length).toBe(0);
});

it('change to null (empty text)', () => {
  const mockOnChange = jest.fn();
  const wrapper = mount(<DateField edit={true} value={'11.05.2014'} onChange={mockOnChange}/>)
  wrapper.find('input').simulate('change', { target: { value: '' }})
  expect(mockOnChange).toHaveBeenCalledWith(null);
});


