import React, {
  useEffect,
  useCallback,
} from 'react'
import { store } from '../../store'
import './Home.css'



function Home() {
  const [ globalState, dispatch ] = store()
 
  return (
    <div className='Home-container'>
     <p>Logged in!</p>
    </div>
  )
}

export default Home
