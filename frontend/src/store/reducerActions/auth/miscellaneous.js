import axios from 'axios'
import _ from 'lodash'

const loginAuthReducerActions = {
  // Synchronous actions
  sync: {
    CHANGE_USER__STARTED: (state) => (
      { ...state, changingUser: true }
    ),
    CHANGE_USER__FAILED: (state, { payload }) => (
      { ...state, changingUser: false, loginError: payload }
    ),
    CHANGE_USER__FINISHED: (state, { payload }) => (
      { ...state, changingUser: false, changingUserError: null, currentUser: { ...payload} }
    ),
    REFRESH_USER__STARTED: (state) => (
      { ...state, refreshingUser: true }
    ),
    REFRESH_USER__FAILED: (state, { payload }) => (
      { ...state, refreshingUser: false, loginError: payload }
    ),
    REFRESH_USER__FINISHED: (state, { payload }) => (
      { ...state, refreshingUser: false, loginError: null, currentUser: { ...payload }, loggedIn: true }
    ),
  },
  // Asynchronous actions
  // Each async action should have 3 related synchronous actions:
  // __STARTED, __FAILED, __FINISHED
  async: {
    CHANGE_USER: ({ dispatch }) => async ({ payload }) => {
      try {
        const user = payload
        dispatch({ type: 'CHANGE_USER__STARTED' })
        dispatch({ type: 'CHANGE_USER__FINISHED', payload: user })
      } catch (err) {
        dispatch({ type: 'CHANGE_USER__FAILED', payload: _.get(err, 'response.data') })
      }
    },
    REFRESH_USER: ({ dispatch }) => async ({ payload }) => {
      try {
        dispatch({ type: 'REFRESH_USER__STARTED' })
        const res = await axios.get('/api/auth/session')
        dispatch({ type: 'REFRESH_USER__FINISHED', payload: res.data })
      } catch (err) {
        dispatch({ type: 'REFRESH_USER__FAILED', payload: payload || _.get(err, 'response.data') })
      }
    },
  },
}

export default loginAuthReducerActions
