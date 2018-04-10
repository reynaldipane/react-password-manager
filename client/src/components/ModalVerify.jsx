import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  showPassword,
  setShowModal
} from '../redux/password/password.action'
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    minWidth              : '30%'
  }
};



class ModalVerify extends Component {

  constructor () {
    super()
    this.state = {
      password: ``,
      message: ``,
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  confirmShow = () => {
    let userData = {
      username_email: this.props.userEmail,
      password: this.state.password
    }
    let passwordId = this.props.passwordIdToShow

    this.props.showPassword(userData,passwordId).then(() => {
      if (this.props.passwordToShow) {
        this.setState({
          message: `Your password is '${this.props.passwordToShow}' 
                    \n
                    Please keep it as secret`
        })
      } else {
        this.setState({
          message: `Wrong password`
        })
      }
    })
  }

  clearState = () => {
    this.setState({
      password: ``,
      message: ``
    })
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.props.setShowModal(false);
    this.setState({
      message: ``
    })
  }

  render() {
    return (
      <div id="modal-password-show">
        {/* <button onClick={this.openModal}>Open Modal</button> */}
        <Modal
          isOpen={this.props.showModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <p className="text-center">Please confirm your password to show</p>
          <div className="form-group col-md-6 col-md-offset-3">
            <input name="password" type="password" className="form-control" placeholder="Your Password" onChange={ this.handlePasswordChange } />
          </div>
          <div className="row">
            <div className="form-group col-md-8 col-md-offset-2 text-center">
              <button type="submit" className="btn btn-success col-md-6 col-md-offset-3" onClick={ this.confirmShow }>Confirm</button>
            </div>
          </div>
          <div className="row">
            <p className="text-center" style={{fontWeight: 'bold'}}>{ this.state.message }</p>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    passwordIdToShow: state.passwordReducer.passwordIdToShow,
    passwordToShow: state.passwordReducer.passwordToShow,
    userEmail: state.signInReducer.userData.email,
    showModal: state.passwordReducer.showModal
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showPassword,
  setShowModal
},dispatch)

export default connect( mapStateToProps, mapDispatchToProps)(ModalVerify);