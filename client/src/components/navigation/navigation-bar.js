import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import logo from '../../logo.svg';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/user-actions';

class NavigationBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick(event, { name }) {
    this.setState({
      activeItem: name
    })
    console.log(name);
    if (name === 'signout') {
      this.props.logoutUser()
      this.props.history.push('/')
    }
  }
  render() {
    const { activeItem } = this.state
    let welcomeText;
    let rightButton;
    let leftButton;
    if (this.props.userState.isSignedIn) {
      welcomeText = (
        'Welcome ' + this.props.userState.user.firstName + ' ' + this.props.userState.user.lastName
      )
      rightButton = (
        <Menu.Item
          name='signout'
          active={activeItem === 'signout'}
          onClick={this.handleItemClick}
        >
          Sign-out
        </Menu.Item>
      )
      if (this.props.userState.user.userType === 'staff') {
        leftButton = (
          <Menu.Item
            name='staff'
            active={activeItem === 'staff'}
            onClick={this.handleItemClick}
            as={Link} to="/staff"
          >
            Staff Area
          </Menu.Item>
        )
      } else {
        leftButton = (
          <Menu.Item
            name='guests'
            active={activeItem === 'guests'}
            onClick={this.handleItemClick}
            as={Link} to="/guests"
          >
            Check-In
          </Menu.Item>
        )
      }
    } else {
      welcomeText = 'You are not signed in, click here ->'
      rightButton = (
        <Menu.Item
          name='signin'
          active={activeItem === 'signin'}
          onClick={this.handleItemClick}
          as={Link} to="/signin"
        >
          Sign-In
                </Menu.Item>
      )
      leftButton = (
        <Menu.Item
          name='guest'
          active={activeItem === 'guest'}
          onClick={this.handleItemClick}
          as={Link} to="/guests"
        >
          Check-In
                </Menu.Item>
      )
    }
    return (
      <Menu stackable>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          as={Link} to="/"
        >
          <img src={logo} alt="logo" />
        </Menu.Item>
        {leftButton}
        <Menu.Menu position='right'>
          <Menu.Item>
            {welcomeText}
          </Menu.Item>
          {rightButton}
        </Menu.Menu>
      </Menu>
    )
  }
}
function mapStateToProps(state) {
  return {
    userState: state.userStore,
  }
}
export default withRouter(connect(mapStateToProps, { logoutUser })(NavigationBar));
