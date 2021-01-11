import React, { useState, useEffect } from "react";
import "./ChatRoom.css";
import { store } from '../../store'
import useChat from "../useChat";


const ChatRoom = (props) => {
    const [ globalState, dispatch ] = store()
  const {
    currentUser,
    currentConvo
  } = globalState
  

  

  const { roomId } = '100';
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");


  
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };


  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  return (
    <div className="chat-room-container">
      <h1 className="room-name">{currentUser.firstName}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {
          messages.map((message, idx) => (
            
            <li
              key={idx}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))
         }
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
}
export default ChatRoom;