import React, { Component } from 'react';
import { Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerUser, loginUser } from '../../actions/user-actions';
import { withRouter } from 'react-router-dom';
import SignInForm from './sign-in-form';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }    
  singin(user) {
    this.props.loginUser(user).then(res => {
      if (res.action.payload.user.userType === 'staff') {
        this.props.history.push('/staff')
      } else {
        this.props.history.push('/guests')
      }
    })
    console.log(this.props)
  }
  handleSubmit(event) {
    let email = event.email
    let password = event.password
    let user = {
      email,
      password
    }
    this.singin(user)
  }
  render() {
    const ErrorMessage = () => (
      <Message negative>
        <Message.Header>Oh no, something went wrong</Message.Header>
        <p>{this.props.userState.errors.global}</p>
      </Message>
    )
    return (
      <div>
        <Header as='h2'>Sign-In Page</Header>
        {this.props.userState.isFailed ? <ErrorMessage/> :  null}
        <SignInForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    userState: state.userStore
  }
}
export default withRouter(connect(mapStateToProps, { registerUser, loginUser })(SignInPage));