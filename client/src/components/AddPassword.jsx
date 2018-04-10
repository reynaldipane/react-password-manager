import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storePassword } from '../redux/password/password.action'
import { bindActionCreators } from 'redux';

class AddPassword extends Component {
  constructor () {
    super()
    this.state = {
      newPassword: {
        url: ``,
        username: ``,
        password: ``
      },
      message: ``,
      safeToSave: false
    }
  }

  checkPassword = (event) => {
    let mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    let strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    if(strongRegex.test(event.target.value)) {
      this.setState({
        message : `Password Strength : Strong`,
        safeToSave: true,
        newPassword: {
          ...this.state.newPassword,
          password: event.target.value
        }        
      })
    } else if (mediumRegex.test(event.target.value) && event.target.value !== '') {   
      this.setState({
        message : `Password Strength: Medium`,
        safeToSave: true,
        newPassword: {
          ...this.state.newPassword,
          password: event.target.value
        }        
      })
    } else {
      this.setState({
        message : `Password Strength: Weak`,
        newPassword: {
          ...this.state.newPassword,
          password: event.target.value
        },
        safeToSave: false
      })
    }
  }

  handleNewPassword = (event) => {
    this.setState({
      newPassword: {
        ...this.state.newPassword,
        [event.target.name]: event.target.value
      }
    })
  }

  storePassword = () => {
    const newPassword   = this.state.newPassword
    newPassword.userid  = this.props.userid

    const safeToSave    = this.state.safeToSave

    if (safeToSave) {
      this.props.storePassword(newPassword)
      .then(() => {
        alert(`New password saved !`)
        this.props.history.replace('/dashboard')
      })
      .catch((err) => {
        alert(`Error saving new password ${err}`)
      })
    } else {
      alert('Please enter stronger password !')
    }

  }

  render() {
    return (
      <section className="content" style={{ 'marginTop': '50px'}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="box box-warning">
              <div className="box-body">
                <h3 style={{marginBottom: `40px`}}>Add new password to store</h3>              
                <div className="form-group col-md-6 col-md-offset-3">
                  <label className="pull-left">URL Websites</label>
                  <input name="url" type="text" onChange = { this.handleNewPassword } className="form-control" placeholder="Website URL..."/>
                </div>
                <div className="form-group col-md-6 col-md-offset-3">
                  <label className="pull-left">Username</label>
                  <input name="username" type="text" onChange = { this.handleNewPassword } className="form-control" placeholder="Username..."/>
                </div>
                <div className="form-group col-md-6 col-md-offset-3">
                  <label className="pull-left">Password</label>
                  <input name="password" type="text" onChange = { this.checkPassword } className="form-control" placeholder="Password..."/>
                  { `  ${this.state.message}`}
                </div>
                <div className="row">
                  <div className="form-group col-md-4 col-md-offset-4">
                    <button type="submit" className="btn btn-success col-md-6 col-md-offset-3" onClick={ this.storePassword }>Store Password</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.signInReducer.userData.userId
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  storePassword
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddPassword);