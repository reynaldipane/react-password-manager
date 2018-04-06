import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={ SignInForm }></Route>
          <Route path='/signup' component={ SignUpForm }></Route>
          <Route path='/dashboard' component={ Dashboard }></Route>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.signInReducer.userData
  }
}

export default connect(mapStateToProps, null)(App);
