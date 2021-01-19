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
  currentConvo[i].ownedByCurrentUser = currentConvo[i].senderId === currentUser.id;
};
  setMessages(currentConvo)
    }
    },[currentConvo]);
    
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { id },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.user._id === currentUser.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
      dispatch({ type: 'ADD_MESSAGE', payload: {message, id}} )
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      _id: uuid.v4(),
      createdAt: new Date(),
      text: messageBody,
      user:{
        _id: currentUser.id,
      name: 'kevin'}
    });
  };

  return { messages, sendMessage };
};

export default useChat;