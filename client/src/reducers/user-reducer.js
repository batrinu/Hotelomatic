const defaultState = {
  user: {},
  checkins: [],
  errors: {},
  isSignedIn: false,
  isLoading: false,
  isFailed: false,
  isCheckInDone: false,
  data: []
}

export default (state = defaultState, action = {}) => {
  //REGISTER USER
  switch (action.type) {
    case 'REGISTER_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        errors: {}
      }
    case 'REGISTER_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errors: { global: action.payload.message }
      }
    case 'REGISTER_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        errors: {}
      }
    case 'LOGIN_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        errors: {}
      }
    case 'LOGIN_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errors: { global: action.payload.message }
      }
    case 'LOGIN_USER_FULFILLED':
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isSignedIn: true,
        errors: {}
      }
    case 'LOGIN_USER_JWT_PENDING':
      return {
        ...state,
        isLoading: true,
        errors: {}
      }
    case 'LOGIN_USER_JWT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errors: { global: action.payload.message }
      }
    case 'LOGIN_USER_JWT_FULFILLED':
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isSignedIn: true,
        errors: {}
      }
    case 'LOGOUT_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        errors: {}
      }
    case 'LOGOUT_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errors: { global: action.payload.message }
      }
    case 'LOGOUT_USER_FULFILLED':
      return {
        ...state,
        user: {},
        isLoading: false,
        isSignedIn: false,
        errors: {}
      }
    case 'CHECKIN_GUEST_PENDING':
      return {
        ...state,
        isLoading: true,
        errors: {},
        isCheckInDone: false,
      }
    case 'CHECKIN_GUEST_REJECTED':
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errors: { global: action.payload.message }
      }
    case 'CHECKIN_GUEST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isCheckInDone: true,
        errors: {}
      }
    case 'FETCH_CHECKINS_PENDING':
      return {
        ...state,
        isLoading: true,
        errors: {}
      }
    case 'FETCH_CHECKINS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errors: { global: action.payload.message }
      }
    case 'FETCH_CHECKINS_FULFILLED':
      return {
        ...state,
        checkins: action.payload.data,
        isLoading: false,
        errors: {}
      }
    case 'DELETE_CHECKIN_PENDING':
      return {
        ...state,
        isLoading: true,
        errors: {}
      }
    case 'DELETE_CHECKIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errors: { global: action.payload.message }
      }
    case 'DELETE_CHECKIN_FULFILLED':
      const _id = action.payload._id;
      return {
        ...state,
        checkins: state.checkins.filter(item => item._id !== _id),
        isLoading: false,
        errors: {}
      }
    case 'UPDATE_CHECKIN_PENDING':
      return {
        ...state,
        isLoading: true,
        errors: {}
      }
    case 'UPDATE_CHECKIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errors: { global: action.payload.message }
      }
    case 'UPDATE_CHECKIN_FULFILLED':
      console.log(action.payload);
      const checkin = action.payload;
      return {
        ...state,
        checkins: state.checkins.map(item => item._id === checkin._id ? checkin : item),
        isLoading: false,
        errors: {}
      }
    default:
      return state;
  }
}
