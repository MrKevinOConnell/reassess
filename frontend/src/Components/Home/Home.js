import React, { useState, useEffect } from "react";
import { Redirect, useLocation} from 'react-router-dom'
import PillButton from '../PillButton/PillButton'
import "./Home.css";
import { store } from '../../store'
import SideBar from '../SideBar/SideBar'
import ChatRoom from "../ChatRoom/ChatRoom";
const Home = () => {
    const [ globalState, dispatch ] = store()
  const {currentLifeCoach} = globalState

  const [clients,setClients] = useState([])

   useEffect(() => {
     console.log(currentLifeCoach.clients)
     if(currentLifeCoach){
    setClients(currentLifeCoach.clients)
    dispatch({ type: 'CHANGE_ROOM_ID', payload:currentLifeCoach.clients[0].chatId})
     }
  }, [currentLifeCoach])

console.log(currentLifeCoach)
  function handleClick(client) {
    dispatch({ type: 'CHANGE_ROOM_ID', payload:client.chatId})
    dispatch({ type: 'CHANGE_USER', payload:client})
  }


  

  return (
    <div className='home-container'>
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