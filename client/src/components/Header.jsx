import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand">To Do React</a>
          </div>
    
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a><i className="fa fa-book"></i> <span>New ToDos</span></a></li>
              <li><a><i className="fa fa-child"></i> <span>My ToDos</span></a></li>
              <button type="button" className="btn btn-default navbar-btn">Log Out</button>
            </ul>
          </div>
    
        </div>
      </nav>
    );
  }
}

export default Header;