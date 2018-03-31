import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import CheckInForm from './check-in-form';
import SignUpForm from '../signup/sign-up-form';
import moment from 'moment'
import { registerUser, loginUser, checkinGuest } from '../../actions/user-actions';

class GuestsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleGuestSignUp = this.handleGuestSignUp.bind(this);
    this.handleCheckIn = this.handleCheckIn.bind(this);
  }
  handleGuestSignUp(data) {
    console.log(data)
    this.props.registerUser(data).then(res=>{
      this.props.loginUser(data)
    });
  }
  handleCheckIn(data) {
    let checkIn = {
      guestDetails: this.props.userState.user,
      checkInDetails: {
        startDate: moment(data.dateRangePicker.startDate).format('DD/MM/YYYY'),
        endDate: moment(data.dateRangePicker.endDate).format('DD/MM/YYYY'),
        roomSize: data.roomSize
      }
    }
    console.log(checkIn);
    this.props.checkinGuest(checkIn)
  }
  render() {
    const MessageSuccess = () => (
      <Message
        success
        header='Your check-in registration was successful'
        content='You may now sign-out or perform another checkin'
      />
    )
    const NoAccount = () => (
      <Message info>
        <Message.Header>It seems you are not registered with us</Message.Header>
        <p>Please fill out the form bellow to proceed</p>
      </Message>
    )
    return (
      <div>
        {this.props.userState.isCheckInDone ? <MessageSuccess /> : null }
        {this.props.userState.isSignedIn
          ?
          <CheckInForm onSubmit={this.handleCheckIn} />
          :
          (
            <div>
              <NoAccount />
              <SignUpForm onSubmit={this.handleGuestSignUp} initialValues={{ userType: 'guest' }} />
            </div>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userState: state.userStore
  }
}

export default withRouter(connect(mapStateToProps, { registerUser, loginUser, checkinGuest })(GuestsPage));
