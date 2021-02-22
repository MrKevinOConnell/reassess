import React, {
  useEffect,
  useCallback,
  useState,
} from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { ToastContainer } from 'react-toastify'
import FormInput from '../FormInput/FormInput'

import { store } from '../../store'
import './SignUp.css'
import PillButton from '../PillButton/PillButton'

function SignUp() {
  const [ globalState, dispatch ] = store()
  const {
    creatingUser,
    creatingUserError,
    fetchingUser,
    fetchingUserError,
  } = globalState

 const [ fieldValues, setFieldValues ] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: 0,
    category: 'Confidence',
  })

   const {email,password,firstName,lastName,age,category} = fieldValues
  const updateState = (e) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    })
  }
  const onSave = () => {
    dispatch({ type: 'SIGN_UP',
      payload: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        age: age,
        category: category
      } })
  }

  if (creatingUser) {
    const to = { pathname: '/login', state: { from: '/signup'} }
    return <Redirect to={to} />
  }

  return (
    <div className='SignUp-container'>
      {
        (creatingUser || fetchingUser) && (
          <Loader
            type='ThreeDots'
            color='#C7C3FB'
            height={100}
            width={100}
            timeout={3000}
          />
        )
      }

      <ToastContainer />

      <div className='SignUp-header'>
        <h1>Sign Up</h1>
      </div>
      {
        creatingUserError && (
          <div className='SignUp-error'>Error creating user: { creatingUserError }</div>
        )
      }
      {
        fetchingUserError && (
          <div className='SignUp-error'>Error fetching passwords: { fetchingUserError }</div>
        )
      }
      <div className='SignUp-newPasswordsContainer'>
        
        
        <PillButton
          onClick={onSave}
          disabled={!email.length || creatingUser || !password.length}
          name='Save'
        />
      </div>
      <div className='SignUp-currentPasswordsContainer'>
       <FormInput
              label='Email'
              name='email'
              value={email}
              onChange={updateState}
              id='Login-emailInput'
            />
          <div className='Login-controls'>
            <FormInput
              label='Password'
              name='password'
              type='password'
              value={password}
              onChange={updateState}
              id='Login-emailInput'
            />
             <FormInput
              label='First Name'
              name='firstName'
              value={firstName}
              onChange={updateState}
              id='Login-emailInput'
            />
            <FormInput
              label='Last Name'
              name='lastName'
              
              value={lastName}
              onChange={updateState}
              id='Login-emailInput'
            />
             <FormInput
              label='Age'
              name='age'
              type='number'
              value={age}
              onChange={updateState}
              id='Login-emailInput'
            />
            <div className='IntentAIContext-itemContainer'>
            <label className='SignUp-newPasswordsLabel'>What category are you?</label>
                  <select name='category' id='category' onChange={updateState} value={category}>
                    <option value='Confidence' selected={category === 'Confidence'}>Confidence</option>
                    <option value='Career' selected={category === 'Career'}>Career</option>
                  </select>
                  </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
