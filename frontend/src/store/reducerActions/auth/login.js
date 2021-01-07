import axios from 'axios'

const loginAuthReducerActions = {
  // Synchronous actions
  sync: {
    SET_LOGIN_ERROR: (state, { payload }) => (
      { ...state, loginError: payload }
    ),
    LOGIN_USER__STARTED: (state) => (
      { ...state, loggingInUser: true }
    ),
    LOGIN_USER__FAILED: (state, { payload }) => (
      { ...state, loggingInUser: false, loginError: payload }
    ),
    LOGIN_USER__FINISHED: (state, { payload }) => (
      { ...state, loggedIn: true, loggingInUser: false, loginError: null, currentUser: payload }
    ),
    SET_PASSWORD__STARTED: (state) => (
      { ...state, settingPassword: true }
    ),
    SET_PASSWORD__FAILED: (state, { payload }) => (
      { ...state, settingPassword: false, loginError: payload }
    ),
    SET_PASSWORD__FINISHED: (state, { payload }) => (
      { ...state, loggedIn: true, loginError: null, settingPassword: false, currentUser: { ...payload } }
    ),
    LOGOUT_USER: (state) => {
      document.cookie = 'access_token=;'
      return { ...state, loggedIn: false, loginError: null, currentUser: {} }
    },
  },
  // Asynchronous actions
  // Each async action should have 3 related synchronous actions:
  // __STARTED, __FAILED, __FINISHED
  async: {
    LOGIN_USER: ({ dispatch }) => async ({ payload }) => {
      try {
        dispatch({ type: 'LOGIN_USER__STARTED' })
        await axios.post('/api/auth/login', payload)
        dispatch({ type: 'LOGIN_USER__FINISHED', payload })
      } catch (err) {
        dispatch({ type: 'LOGIN_USER__FAILED', payload: err.response.data })
      }
    },
    SET_PASSWORD: ({ dispatch }) => async ({ payload }) => {
      try {
        dispatch({ type: 'SET_PASSWORD__STARTED' })
        const res = await axios.post('/api/auth/password', payload)
        dispatch({ type: 'SET_PASSWORD__FINISHED', payload: res.data })
      } catch (err) {
        dispatch({ type: 'SET_PASSWORD__FAILED', payload: err.response.data })
      }
    },
  },
}

export default loginAuthReducerActions
