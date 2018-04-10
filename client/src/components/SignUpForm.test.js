import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignUpForm } from './SignUpForm';

configure({ adapter: new Adapter() });

describe('<SignUp Form />', () => {
  it('should have an input form', () => {
    const wrapper = mount(<SignUpForm />)
    expect(wrapper.exists('<input name="username">')).toBe(true)
    expect(wrapper.exists('<input name="password">')).toBe(true)
    expect(wrapper.exists('<input name="name">')).toBe(true)
    expect(wrapper.exists('<select name="gender">')).toBe(true)    
    expect(wrapper.exists('<button type="submit">')).toBe(true)
  })
})