import React, { useState, useEffect } from "react";
import "./ChatRoom.css";
import { store } from '../../store'
import useChat from "../useChat";
import { DateTime } from "luxon";

const ChatRoom = (props) => {
    const [ globalState, dispatch ] = store()
  const {
    currentLifeCoach,
    currentUser,
    roomId
  } = globalState
    
  const [id, setId] = useState('');
  const { messages, sendMessage } = useChat(id);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

 function timeConvert(time) {
    return new Date(time).toLocaleDateString('en-US',{hour: 'numeric', minute: '2-digit' });
  }

  useEffect(() => {
    setId(roomId)
    console.log(roomId)
  }, [roomId])

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
              <p className = 'text'>{message.text}</p>
              <p className='timestamp'>{timeConvert(message.createdAt)}</p>
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