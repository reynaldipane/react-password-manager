import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpUser } from '../redux/signin/signin.action';
import { bindActionCreators } from 'redux';

export class SignUpForm extends Component {
  constructor () {
    super()
    this.state = {
      userSignUpData: {
        username: ``,
        password: ``,
        name: ``,
        email: ``,
        gender: ``
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      userSignUpData: {
        ...this.state.userSignUpData,
        [event.target.name]: event.target.value
      }
    })
  }

  signUp = () => {
    const userDataSend = this.state.userSignUpData
    this.props.signUpUser(userDataSend)
    .then(() => {
      this.props.history.push('/dashboard')
    })
    .catch((err) => {
      this.props.history.push('/signup')
    })
  }

  render() {
    return (
      <section className="content" style={{ marginTop: '40px' }}>    
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="form-group col-md-4 col-md-offset-4">
              <label>Username</label>
              <input name="username" type="text" className="form-control" placeholder="Your Username" onChange={ this.handleChange } />
            </div>
            <div className="form-group col-md-4 col-md-offset-4">
              <label>Password</label>
              <input name="password" type="password" className="form-control" onChange={ this.handleChange } />
            </div>

            <div className="form-group col-md-4 col-md-offset-4">
              <label>Name</label>
              <input name="name" type="text" className="form-control" placeholder="Your Name" onChange={ this.handleChange } />
            </div>

            <div className="form-group col-md-4 col-md-offset-4">
              <label>Email</label>
              <input name="email" type="email" className="form-control" placeholder="Your real email" onChange={ this.handleChange } />
            </div>

            <div className="form-group col-md-4 col-md-offset-4">
              <label>Gender</label>
              <select name="gender" className="form-control" onChange={ this.handleChange }>
                <option disabled value="">Please select one</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group col-md-4 col-md-offset-4">
              <button type="submit" className="btn btn-success" onClick={ this.signUp }>Sign Up</button>
              <br />
              <br />
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signUpUser
}, dispatch)

export default connect(null, mapDispatchToProps)(SignUpForm);