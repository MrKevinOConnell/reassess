
import "./SideBar.css";
import React from "react";
import { slide as Menu } from 'react-burger-menu';
import { store } from '../../store'
export const SideBar = (goals) => {
 const [ globalState, dispatch ] = store()
  const {currentUser} = globalState
  return (
    <Menu noOverlay>
       <p className="menu-item">
        {currentUser.firstName}'s Daily Goals
      </p>
      
      <p className="menu-item">
        {currentUser.firstName}'s Weekly Goals
      </p>
      
      <p className="menu-item">
         {currentUser.firstName}'s Monthly Goals
      </p>
      <p className="menu-item">
         {currentUser.firstName}'s Yearly Goals
      </p>
      
      </Menu>
  );
};

export default SideBar;