import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UpdatePassword } from './UpdatePassword';

configure({ adapter: new Adapter() });

describe('<Update Password />', () => {
  it('should have an input form', () => {
    const wrapper = mount(<UpdatePassword />)
    expect(wrapper.exists('<input name="url">')).toBe(true)
    expect(wrapper.exists('<input name="username">')).toBe(true)
    expect(wrapper.exists('<input name="password">')).toBe(true)
    expect(wrapper.exists('<button type="submit">')).toBe(true)
  })
})