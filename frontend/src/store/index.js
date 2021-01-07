import { createContainer } from 'react-tracked'
import { useReducerAsync } from 'use-reducer-async'
import PropTypes from 'prop-types'

import reducerActions from './reducerActions'

const initialState = {

  loggedIn: false,
  loginError: null,
  currentUser: {},
 
  
  

  fetchingUser: null,
  fetchingUserError: null,
  creatingUser: null,
  creatingUserError: null,
  createdUser: null,
}
function reducer(state, { type, payload }) {
  const action = reducerActions.sync[type]
  if (!action) throw new Error(`Invalid action specified: ${ type }`)
  return action(state, { type, payload })
}

const { Provider, useTracked } = createContainer(() => useReducerAsync(reducer, initialState, reducerActions.async))

Provider.propTypes = {
  children: PropTypes.any,
}

Provider.defaultProps = {
  children: null,
}

const store = useTracked
export { store, Provider }
