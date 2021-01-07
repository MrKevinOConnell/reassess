import React, { useState, useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { store } from '../../store'
import './Login.css'
import PillButton from '../PillButton/PillButton'
import FormInput from '../FormInput/FormInput'

function Login() {
  const [ globalState, dispatch ] = store()
  const {
    currentUser,
    loginError,
    loggedIn,
  } = globalState
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const location = useLocation()

  useEffect(() => {
    // Will login the user if there's a valid auth token in their browser cookies.
    // Pass a space string so the default server error isn't displayed if the user
    // is just landing on the login page for the first time.
    dispatch({ type: 'REFRESH_USER', payload: ' ' })
  }, [ dispatch ])

  function handleEmailChange(e) {
      e.preventDefault();
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
      e.preventDefault();
    setPassword(e.target.value)
  }

  function handleLoginClick() {
    dispatch({ type: 'LOGIN_USER', payload: { email, password } })
  }

  function handleSignUpClick() {
    const to = { pathname: 'signup', state: { from: 'login' } }
    return <Redirect to={to} />
  }

  function getLoginButton(onClick) {
    return (
      <PillButton
        onClick={onClick}
        name='Submit'
        extraClassName='login'
        id='Login-submit'
      />
    )
  }

   function getToSignUp() {
    return (
      <PillButton
        linkTo='signup'
        name='Sign Up'
        extraClassName='login'
        id='Login-submit'
      />
    )
  }
  

  if (loggedIn) {
    const to = { pathname: '/', state: { from: location } }
    return <Redirect to={to} />
  }

  return (
    <div className='Login-container'>
      <div className='Login-title'>
        Login
      </div>

      
      <FormInput
              label='Email'
              name='email'
              value={email}
              onChange={handleEmailChange}
              id='Login-emailInput'
            />
          <div className='Login-controls'>
            <FormInput
              label='Password'
              name='password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              id='Login-emailInput'
            />
            { getLoginButton(handleLoginClick) }
            {getToSignUp(handleSignUpClick)}

          </div>
        
      {
        !!loginError && (
          <div className='Login-control'>
            <label className='Login-control-error'>{ loginError }</label>
          </div>
        )
      }
    </div>
  )
}

export default Login
