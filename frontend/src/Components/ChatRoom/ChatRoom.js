import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./ChatRoom.css";
import { store } from '../../store'



function ChatRoom() {
    const [ globalState, dispatch ] = store()
  const {
    currentUser,
  } = globalState
  const socket = io.connect("http://localhost:3000");
  const { roomId } = '100'; // Gets roomId from URL
  const [messages, setNewMessage] = useState({message: '', chat: ['Hello','??????','toxic']});; // Message to be sent
  
  const { message, chat } = messages

const updateState = (e) => {
    setNewMessage({
      ...messages,
      [e.target.name]: e.target.value,
    })
  }

  const handleSendMessage = () => {
   socket.emit("chat message", message);
  };

  
  useEffect(() => {
    socket.on("chat message", ({ id, msg }) => {
      // Add new messages to existing messages in "chat"
     setNewMessage({...messages, chat: [...chat, { id, msg }] })
    });
  },[ messages.chat] )
  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
     {
         chat.map((msg,idx) => (
              <span>{msg}</span>
         ))
     }
      </div>
      <textarea
        value={message}
        onChange={updateState}
        name='message'
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