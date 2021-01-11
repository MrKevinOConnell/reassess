import React from 'react'
import PropTypes from 'prop-types'

import { store } from '../../store'
import './NavBar.css'
import PillButton from '../PillButton/PillButton'

function NavBar({ location: { pathname } }) {
  const [ globalState, dispatch ] = store()
  const { loggedIn } = globalState

  function logout() {
    dispatch({ type: 'LOGOUT_USER' })
  }

  if (!loggedIn) return null

  return (
    <div className='NavBar-container'>
      <PillButton linkTo='/' name='Home' selected={pathname === '/'} />
      <PillButton linkTo='/100' name='Chat' selected={pathname === '/100'} />
      <PillButton onClick={logout} name='Logout' />
    </div>
  )
}

NavBar.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }),
}

NavBar.defaultProps = {
  location: {
    pathname: '',
  },
}

export default NavBar
