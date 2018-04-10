import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {
  Switch,
  Route
} from 'react-router-dom';
import TablePasswords from './TablePasswords';
import AddPassword from './AddPassword';
import UpdatePassword from './UpdatePassword';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <h3 style={{marginTop:'75px'}}>Hi.. { this.props.userData.username }</h3>
        <Switch>
          <Route exact path={this.props.match.url} component={TablePasswords}></Route>
          <Route path={`${this.props.match.url}/add`} component={AddPassword}></Route>
          <Route path={`${this.props.match.url}/update/:id`} component={UpdatePassword}></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.signInReducer.userData,
    userPasswords: state.passwordReducer.userPasswords
  }
}

export default connect(mapStateToProps,null)(Dashboard);