import React from "react";
import { Redirect, useLocation } from 'react-router-dom'
import PillButton from '../PillButton/PillButton'
import "./Home.css";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

   function getToRoom() {
    return (
      <PillButton
        linkTo={`/${roomName}`}
        name='Go to Room'
        extraClassName='login'
        id='Login-submit'
      />
    )
  }

   function handleRoomClick() {
    const to = { pathname: '/100', state: { from: '/' } }
    return <Redirect to={to} />
  }

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      {getToRoom(handleRoomClick)}
    </div>
  );
};

export default Home;