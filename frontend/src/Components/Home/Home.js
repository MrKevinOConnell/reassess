import React, { useState, useEffect } from "react";
import { Redirect, useLocation} from 'react-router-dom'
import PillButton from '../PillButton/PillButton'
import "./Home.css";
import { store } from '../../store'
import 'react-pro-sidebar/dist/css/styles.css';
import ChatRoom from "../ChatRoom/ChatRoom";
import Sidebar from '../SideBar/SideBar';


const Home = () => {
    const [ globalState, dispatch ] = store()
  const {currentLifeCoach} = globalState

  const [clients,setClients] = useState([])
   useEffect(() => {
     console.log(currentLifeCoach.clients)
     if(currentLifeCoach.clients.length){
    setClients(currentLifeCoach.clients)
  
    dispatch({ type: 'CHANGE_ROOM_ID', payload:currentLifeCoach.clients[0].chatId})
    // TODO: add api call to this to access goals
    dispatch({ type: 'CHANGE_USER', payload:currentLifeCoach.clients[0]})
     }
  }, [currentLifeCoach])

  function handleClick(client) {
    if(client) {
    dispatch({ type: 'CHANGE_ROOM_ID', payload:client.chatId})
    dispatch({ type: 'CHANGE_USER', payload:client})
    }
  }


  

  return (
    <div className='home-container'>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
       <div className='home-buttons-container'>
       { clients.map((client, idx) => (
           <li
              key={idx}
            >
               <PillButton
        onClick={() => handleClick(client)}
        name={client.firstName}
        extraClassName='login'
        id='Login-submit'
      />
            </li>
          ))
       }
      </div>
    
    <ChatRoom id/>
    </div>
  );
};

export default Home;