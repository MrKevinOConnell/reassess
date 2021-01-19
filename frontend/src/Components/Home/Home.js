import React from "react";
import { Redirect, useLocation } from 'react-router-dom'
import PillButton from '../PillButton/PillButton'
import "./Home.css";
import { store } from '../../store'
import SideBar from '../SideBar/SideBar'
import ChatRoom from "../ChatRoom/ChatRoom";
const Home = () => {
    const [ globalState, dispatch ] = store()
  const {
  } = globalState
  function handleClick(id) {
    dispatch({ type: 'CHANGE_ROOM_ID', payload:id})
  }

  return (
    <div className='home-container'>
       <div className='home-buttons-container'>
         
<PillButton
        onClick={() => handleClick('100')}
        name='100'
        extraClassName='login'
        id='Login-submit'
      />
      <PillButton
        onClick={() => handleClick('200')}
        name='200'
        extraClassName='login'
        id='Login-submit'
      />
      <PillButton
        onClick={() => handleClick('300')}
        name='300'
        extraClassName='login'
        id='Login-submit'
      />
      <PillButton
        onClick={() => handleClick('400')}
        name='400'
        extraClassName='login'
        id='Login-submit'
      />
      </div>
    
    <ChatRoom id/>
    </div>
  );
};

export default Home;