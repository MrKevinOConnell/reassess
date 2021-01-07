import React, {
  useEffect,
  useCallback,
  useState,
} from 'react'
import Loader from 'react-loader-spinner'
import { ToastContainer } from 'react-toastify'


import { store } from '../../store'
import './SignUp.css'
import PillButton from '../PillButton/PillButton'

function SignUp() {
  const [ globalState, dispatch ] = store()
  const {
    passwords,
    creatingPasswords,
    creatingPasswordsError,
    fetchingPasswords,
    fetchingPasswordsError,
  } = globalState

  useEffect(() => {
    dispatch({ type: 'FETCH_PASSWORDS' })
  }, [ dispatch ])

  const [ newPasswords, setNewPasswords ] = useState('')
  const onEditPasswords = useCallback((e) => {
    setNewPasswords(e.target.value)
  }, [])

  const createNewPasswords = useCallback(() => {
    dispatch({ type: 'CREATE_PASSWORDS', payload: newPasswords.split(',').map((s) => s.trim()) })
    setNewPasswords('')
  }, [ dispatch, newPasswords ])

  const deletePassword = useCallback((passwordId) => {
    dispatch({ type: 'DELETE_PASSWORD', payload: passwordId })
  }, [ dispatch ])


  return (
    <div className='SignUp-container'>
      {
        (creatingPasswords || fetchingPasswords) && (
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
        <h1>Password Management</h1>
      </div>
      {
        creatingPasswordsError && (
          <div className='SignUp-error'>Error creating passwords: { creatingPasswordsError }</div>
        )
      }
      {
        fetchingPasswordsError && (
          <div className='SignUp-error'>Error fetching passwords: { fetchingPasswordsError }</div>
        )
      }
      <div className='SignUp-newPasswordsContainer'>
        <h3>New Passwords</h3>
        <label className='SignUp-newPasswordsLabel'>
          Can enter multiple comma separated passwords (the leading and trailing whitespace will be trimmed off).
        </label>
        <textarea
          className='SignUp-newPasswordsTextarea'
          onChange={onEditPasswords}
          value={newPasswords}
          cols='30'
          rows='10'
        />
        <PillButton
          onClick={createNewPasswords}
          disabled={!newPasswords.length || creatingPasswords}
          name='Save'
        />
      </div>
      <div className='SignUp-currentPasswordsContainer'>
        <h3>Current Passwords</h3>
        <div className='SignUp-passwords'>
          {
            passwords.map((password) => (
              <div key={password.id} className='SignUp-password'>
                <div className='SignUp-passwordBody'>{ password.body }</div>
                <div
                  onClick={deletePassword.bind(null, password.id)}
                  className='SignUp-passwordDelete'
                >
                  X
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp
