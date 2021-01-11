import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios'
import { store } from '../store'
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
    dispatch({ type: 'GET_MESSAGES', payload: id,})
    },[]);


    useEffect(() => {
       dispatch({ type: 'GET_MESSAGES', payload: id,})
      if(currentConvo.length) {
        console.log('currentconvo',currentConvo)
         /* const newMsg = {
         ...message,
        ownedByCurrentUser: message.senderId === currentUser.id,
        }
        */
       
       for (var i = 0; i < currentConvo.length; i++) {
  currentConvo[i].ownedByCurrentUser = currentConvo[i].senderId === currentUser.id;
};
       
         setMessages(currentConvo)
       
      console.log('messages after for each', messages)
      
    }
    },[currentConvo]);
    
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { id },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === currentUser.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
      dispatch({ type: 'ADD_MESSAGE', payload: { message: message }})
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: currentUser.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;