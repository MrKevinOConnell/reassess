import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios'
import { store } from '../store'
const uuid = require('uuid')
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:8080";

const useChat = (id) => {
    const [ globalState, dispatch ] = store()
  const {
    currentConvo,
    currentLifeCoach,
    currentUser,
    fetchingCurrentConvo,
  } = globalState
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    setMessages([])
    dispatch({ type: 'GET_MESSAGES', payload: id})
    },[id]);


    useEffect(() => {
      if(currentConvo.length) {
       for (var i = 0; i < currentConvo.length; i++) {
  currentConvo[i].ownedByCurrentUser = currentConvo[i].user._id === currentLifeCoach.id;
};
  setMessages(currentConvo)
    }
    },[currentConvo]);
    
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit('join',id)

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.user._id === currentLifeCoach.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
  
    });

    return () => {
       socketRef.current.disconnect();
    };
  }, [id]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      _id: uuid.v4(),
      roomId: id,
      createdAt: new Date(),
      text: messageBody,
      user:{
        _id: currentLifeCoach.id,
      name: currentLifeCoach.firstName}
    });
    dispatch({ type: 'ADD_MESSAGE', payload: {messageBody, id}} )
  };

  return { messages, sendMessage };
};

export default useChat;