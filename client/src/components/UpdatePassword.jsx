import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findPassword, updatePassword } from '../redux/password/password.action';
import { bindActionCreators } from 'redux'

export class UpdatePassword extends Component {
  constructor () {
    super()
    this.state = {
      message: ``,
      passwordToUpdate: {
        url: ``
        ,
        username: ``,
        password:  ``
      },
      safeToSave: false,
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.props.findPassword(id)
    .then(() => {
      this.setState({
        passwordToUpdate:this.props.passwordToUpdate
      })
      this.checkStatusPassword(this.state.passwordToUpdate.password)
    })
  }

  checkStatusPassword = (password) => {
    let mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    let strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    if(strongRegex.test(password)) {
      this.setState({
        message : `Password Strength : Strong`,
        safeToSave: true,
        passwordToUpdate: {
          ...this.state.passwordToUpdate,
          password: password
        }        
      })
    } else if (mediumRegex.test(password) && password !== '') {   
      this.setState({
        message : `Password Strength: Medium`,
        safeToSave: true,
        passwordToUpdate: {
          ...this.state.passwordToUpdate,
          password: password
        }        
      })
    } else {
      this.setState({
        message : `Password Strength: Weak`,
        passwordToUpdate: {
          ...this.state.passwordToUpdate,
          password: password
        },
        safeToSave: false
      })
    }
  }

  checkPasswordChange = (event) => {
    this.checkStatusPassword(event.target.value)
  }

  handleUpdatePassword = (event) => {
    this.setState({
      passwordToUpdate: {
        ...this.state.passwordToUpdate,
        [event.target.name]: event.target.value
      }
    })
  }

  updatePassword = () => {
    const dataToUpdate = this.state.passwordToUpdate    
    const id  = this.props.match.params.id
    const safeToSave = this.state.safeToSave
    
    if (safeToSave) {
      this.props.updatePassword(id,dataToUpdate)
      .then(() => {
        alert('Update password success !')
        this.props.history.replace('/dashboard')
      })
      .catch((err) => {
        alert(`Failed to update password ! ${err}`)
      })
    } else {
      alert('Please enter stronger password !')
    }

  }

  render() {
    let dtPassword = this.state.passwordToUpdate
    return (
      <section className="content" style={{ 'marginTop': '50px'}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="box box-warning">
              <div className="box-body">
                <h3 style={{marginBottom: `40px`}}>Update existing password</h3>              
                <div className="form-group col-md-6 col-md-offset-3">
                  <label className="pull-left">URL Websites</label>
                  <input name="url" type="text" onChange = { this.handleUpdatePassword.bind(this) } className="form-control" value={ dtPassword.url }/>
                </div>
                <div className="form-group col-md-6 col-md-offset-3">
                  <label className="pull-left">Username</label>
                  <input name="username" type="text" onChange = { this.handleUpdatePassword } className="form-control" value={ dtPassword.username }/>
                </div>
                <div className="form-group col-md-6 col-md-offset-3">
                  <label className="pull-left">Password</label>
                  <input name="password" type="text" onChange = { this.checkPasswordChange } className="form-control" value={ dtPassword.password }/>
                  { `  ${this.state.message}`}
                </div>
                <div className="row">
                  <div className="form-group col-md-4 col-md-offset-4">
                    <button type="submit" className="btn btn-success col-md-6 col-md-offset-3" onClick={ this.updatePassword }>Store Password</button>
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
    passwordToUpdate: state.passwordReducer.passwordToUpdate
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  findPassword,
  updatePassword
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
