import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';

export class App extends Component {
  PrivateDashboard = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      this.props.userData.userToken
      ? <Component {...props}/>
      : <Redirect to='/'/>
    )} />
  )

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={ SignInForm }></Route>
          <Route path='/signup' component={ SignUpForm }></Route>
          <this.PrivateDashboard path='/dashboard' component={ Dashboard }></this.PrivateDashboard>
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
