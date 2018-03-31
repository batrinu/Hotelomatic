import client from './';

export function registerUser(user) {
  return dispatch => {
    return dispatch({
      type: 'REGISTER_USER',
      payload: client.service('/users').create(user)
    })
  }
}
export function loginUser(user) {
  return dispatch => {
    return dispatch({
      type: 'LOGIN_USER',
      payload: client.authenticate({
        strategy: 'local',
        email: user.email,
        password: user.password
      })
    })
  }
}
export function loginUserJWT(jwt) {
  return dispatch => {
    return dispatch({
      type: 'LOGIN_USER_JWT',
      payload: client.authenticate({
        strategy: 'jwt',
        accessToken: jwt
      })
    })
  }
}
export function logoutUser() {
  return dispatch => {
    return dispatch({
      type: 'LOGOUT_USER',
      payload: client.logout()
    })
  }
}

export function checkinGuest(data) {
  return dispatch => {
    return dispatch({
      type: 'CHECKIN_GUEST',
      payload: client.service('/checkins').create(data)
    })
  }
}

export function fetchCheckins() {
  return dispatch => {
    return dispatch({
      type: 'FETCH_CHECKINS',
      payload: client.service('/checkins').find()
    })
  }
}

export function deleteCheckin(id) {
  return dispatch => {
    return dispatch({
      type: 'DELETE_CHECKIN',
      payload: client.service('/checkins').remove(id)
    })
  }
}

export function updateCheckin(id, data) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_CHECKIN',
      payload: client.service('/checkins').update(id, data)
    })
  }
}