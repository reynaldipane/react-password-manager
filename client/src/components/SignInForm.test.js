import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignInForm } from './SignInForm';

configure({ adapter: new Adapter() });

describe('<SignIn Form />', () => {
  it('should have an input form', () => {
    const wrapper = mount(<SignInForm />)
    expect(wrapper.exists('<input name="username_email">')).toBe(true)
    expect(wrapper.exists('<input name="password">')).toBe(true)
    expect(wrapper.exists('<button type="submit">')).toBe(true)
  })
})