import { createContainer } from 'react-tracked'
import { useReducerAsync } from 'use-reducer-async'
import PropTypes from 'prop-types'

import reducerActions from './reducerActions'

const initialState = {
  //log in stuff
  loggedIn: false,
  loginError: null,
  currentLifeCoach: {},
  //grabbing and updating convos
  currentUserClicked: null,
  updatingRoomId: null,
  updatingRoomIdError: null,
  roomId: 0,
  currentConvo: [],
  fetchingCurrentConvo: null,
  fetchingCurrentConvoError: null,
  updatingConvo: null,
  updatingConvoError: null,
  fetchingLifeCoach: null,
  fetchingLifeCoachError: null,
  creatingLifeCoach: null,
  creatingLifeCoachError: null,
  createdLifeCoach: null,
  //tracking current user clicked
  currentUser: {},
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
