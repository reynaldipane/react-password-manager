import React, { Component } from 'react';
import Header from './Header'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <br/>
        <br/>
        <div>
          <h3>Hi.. {this.props.userData.username}</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.signInReducer.userData
  }
}

export default connect(mapStateToProps,null)(Dashboard);