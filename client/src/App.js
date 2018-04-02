import React, { Component } from 'react';
import { Route, Switch, withRouter, Link, Redirect } from "react-router-dom";
import { Container, Message, Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';
import NavigationBar from './components/navigation/navigation-bar';
import GuestsPage from './components/guests/guests-page';
import SignInPage from './components/signin/sign-in-page';
import { loginUserJWT } from './actions/user-actions';
import StaffPage from './components/staff/staff-page';

const HomePage = () => (
  <Grid.Row>
    <Grid.Column>
      <Message>
        <Header as='h1'>Welcome to the best check-in service this side of the galaxy</Header>
        <p>
          Just click, tap, zap the button bellow to proceed
        </p>
        <Link className='ui primary button' to='/guests'>Check-In &raquo;</Link>
      </Message>
    </Grid.Column>
  </Grid.Row>
)

const PrivateRoute = ({ component: Component, ...rest }, isSignedIn) => (
  <Route
    {...rest}
    render={props =>
      isSignedIn ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

class App extends Component {
  componentWillMount() {
    if (window.localStorage) {
      // localStorage can be used
      let jwt = window.localStorage.getItem('feathers-jwt')
      this.props.loginUserJWT(jwt)
    } else {
      // can't be used
    }

  }
  render() {
    return (
      <Container text>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/guests" component={GuestsPage} />
          <PrivateRoute
            path="/staff"
            component={StaffPage}
            isSignedIn={this.props.userState.isSignedIn}
          />
          <Route path="/signin" component={SignInPage} />
        </Switch>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userState: state.userStore,
    formState: state.form
  }
}

export default withRouter(connect(mapStateToProps, { loginUserJWT })(App));
