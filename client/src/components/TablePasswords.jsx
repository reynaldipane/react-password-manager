import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  getUserPassword,
  deletePassword,
  setIdPasswordToShow,
  setShowModal
} from '../redux/password/password.action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalVerify from './ModalVerify';

class TablePasswords extends Component {
  constructor () {
    super()
    this.state = {
      searchquery: ``
    }
  }

  getUserPasswords = () => {
    const userId = this.props.userData.userId
    this.props.getUserPassword(userId)
  }

  componentDidMount () {
    this.getUserPasswords()
  }

  handleSearch = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  deletePassword = (id) => {
    this.props.deletePassword(id)
      .then(() => {
        alert(`Password deleted !`)
        this.props.history.push('/dashboard')
        this.getUserPasswords()
      })
  }

  replacePassword = (password) => {
    let secretPassword = password.replace(/./g, '.')
    return secretPassword
  }

  showId = (id) => {
    this.props.setIdPasswordToShow(id)
    this.props.setShowModal(true)
  }

  render() {
    let filteredPassword = this.props.userPasswords.filter((password) => {
      return password.url.toLowerCase().indexOf(this.state.searchquery.toLowerCase()) !== -1
    })
    return (
      <div>
        <ModalVerify></ModalVerify>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-xs-8">
              <div className="pull-left">
                <Link to={`/dashboard/add`}>
                  <button className="btn btn-primary">Add new password</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop:'10px'}}>
            <div className="col-md-8 col-xs-8">
              <div className="pull-left">
                <input name="searchquery" onChange={ this.handleSearch } type="text" className="form-control" placeholder="Search Website Name..."/>
              </div>
            </div>
          </div>

          <div className="table-responsive" style={{marginTop:'10px'}}>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center">URL Websites</th>
                  <th className="text-center">Username</th>
                  <th className="text-center">Password</th>           
                  <th className="text-center">Created At</th>
                  <th className="text-center">Updated At</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPassword.map(password => {
                  return (
                    <tr key={password._id}>
                      <td>{password.url}</td>
                      <td>{password.username}</td>
                      <td style={{ fontWeight:'bold', fontSize: '14px'}}>
                        { this.replacePassword(password.password) }
                        <br/>
                        <br/>
                        <button className="btn btn-primary" onClick = { () => { this.showId(password._id) }}>
                          Show
                        </button>
                      </td>
                      <td>{password.createdAt}</td>
                      <td>{password.updatedAt}</td>                    
                      <td>
                        <Link to={`/dashboard/update/${password._id}`}>
                          <button className="btn btn-warning">
                            <i className="glyphicon glyphicon-pencil"></i>
                          </button>
                        </Link>
                        <button className="btn btn-danger" style={{marginLeft: '3px'}} onClick={ () => {this.deletePassword(password._id)}}> 
                          <i className="glyphicon glyphicon-trash"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserPassword,
  deletePassword,
  setIdPasswordToShow,
  setShowModal
}, dispatch)

const mapStateToProps = (state) => {
  return {
    userData: state.signInReducer.userData,
    userPasswords: state.passwordReducer.userPasswords
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TablePasswords);
