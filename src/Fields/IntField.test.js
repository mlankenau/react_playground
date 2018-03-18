import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {IntField} from './IntField'
import { shallow, mount } from 'enzyme'
import {} from '../TestSetup'

it('renders a number in display mode', () => {
  const wrapper = mount(<IntField edit={false} value={123}/>)
  expect(wrapper.find('div').text()).toBe('123')
});

it('renders null in display mode', () => {
  const wrapper = mount(<IntField edit={false} value={null}/>)
  expect(wrapper.find('div').text()).toBe('')
});

it('renders a input field in edit mode', () => {
  const wrapper = mount(<IntField edit={true} value={123}/>)
  expect(wrapper.find('input').prop('value')).toBe(123)
});

it('renders null in edit mode', () => {
  const wrapper = mount(<IntField edit={true} value={null}/>)
  expect(wrapper.find('input').prop('value')).toBe('')
});

it('valid change', () => {
  const mockOnChange = jest.fn();
  const wrapper = mount(<IntField edit={true} value={'123'} onChange={mockOnChange}/>)
  wrapper.find('input').simulate('change', { target: { value: '456' }})
  expect(mockOnChange).toHaveBeenCalledWith(456);
});

it('invalid change', () => {
  const mockOnChange = jest.fn();
  const wrapper = mount(<IntField edit={true} value={'123'} onChange={mockOnChange}/>)
  wrapper.find('input').simulate('change', { target: { value: '456a' }})
  expect(mockOnChange.mock.calls.length).toBe(0);
});

