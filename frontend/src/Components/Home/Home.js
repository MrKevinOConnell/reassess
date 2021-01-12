import React from "react";
import { Redirect, useLocation } from 'react-router-dom'
import PillButton from '../PillButton/PillButton'
import "./Home.css";
import SideBar from '../SideBar/SideBar'
import ChatRoom from "../ChatRoom/ChatRoom";
const Home = () => {

  return (
    <div>
    <SideBar width={250} height={"100vh"}>
       <h1>Nav Item</h1>
          <h1>Nav Item</h1>
          <h1>Nav Item</h1>
          <h1>Nav Item</h1>
          <h1>Nav Item</h1>
    </SideBar>
    <ChatRoom/>
    </div>
  );
};

export default Home;