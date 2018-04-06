import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
  render() {
    return (
      <section className="content" style={{marginTop:'40px'}}>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
            <div className="form-group col-md-4 col-md-offset-4">
                <label>Username</label>
                <input id="login-username" type="text" className="form-control" placeholder="Your Username"/>
            </div>
            <div className="form-group col-md-4 col-md-offset-4">
                <label>Password</label>
                <input id="login-password" type="password" className="form-control"/>
            </div>
  
            <div className="form-group col-md-4 col-md-offset-4">
                <label>Name</label>
                <input id="login-username" type="text" className="form-control" placeholder="Your Name"/>
            </div>
  
            <div className="form-group col-md-4 col-md-offset-4">
                <label>Email</label>
                <input id="login-username" type="email" className="form-control" placeholder="Your real email"/>
            </div>
  
            <div className="form-group col-md-4 col-md-offset-4">
                <label>Gender</label>
                <select className="form-control">
                    <option disabled value="">Please select one</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
  
            <div className="form-group col-md-4 col-md-offset-4">
                <button type="submit" className="btn btn-success">Sign Up</button>
                <br/>
                <br/>
                <Link to={`/`}>
                  <button type="submit" className="btn btn-danger">Back</button>
                </Link>
            </div>
        </div>
      </div>
  </section>
    );
  }
}

export default SignUpForm;