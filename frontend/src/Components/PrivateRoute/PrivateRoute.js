import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { store } from '../../store'

function PrivateRoute({ children, ...rest }) {
  const [ globalState ] = store()
  const { loggedIn } = globalState

  function redirectIfNotLoggedIn({ location }) {
    if (loggedIn) return children
    const to = { pathname: '/login', state: { from: location } }
    return <Redirect to={to} />
  }

  return <Route {...rest} render={redirectIfNotLoggedIn} />
}

export default PrivateRoute
