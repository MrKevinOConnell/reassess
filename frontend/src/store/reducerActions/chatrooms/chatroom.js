import axios from 'axios'

const chatroomReducerActions = {
  // Synchronous actions
  sync: {
    GET_MESSAGES__STARTED: (state) => (
      { ...state, fetchingCurrentConvo: true}
    ),
   GET_MESSAGES__FAILED: (state, { payload }) => (
      { ...state, fetchingCurrentConvo: false, fetchingCurrentConvoError: payload }
    ),
   GET_MESSAGES__FINISHED: (state, { payload }) => (
      { ...state, currentConvo:payload, fetchingCurrentConvo: false,fetchingCurrentConvoError: null }
   ),
   ADD_MESSAGE__STARTED: (state) => (
      { ...state, updatingCurrentConvo: true}
    ),
   ADD_MESSAGE__FAILED: (state, { payload }) => (
      { ...state, updatingConvo: false, updatingConvoError: payload }
    ),
   ADD_MESSAGE__FINISHED: (state, { payload }) => (
      { ...state, updatingCurrentConvo: false, updatingConvoError: null }
   ),
  CHANGE_ROOM_ID__STARTED: (state) => (
      { ...state, updatingRoomId: true}
    ),
   CHANGE_ROOM_ID__FAILED: (state, { payload }) => (
      { ...state, updatingRoomId: false, updatingRoomIdError: payload }
    ),
   CHANGE_ROOM_ID__FINISHED: (state, { payload }) => (
      { ...state, updatingRoomId: false, updatingRoomIdError: null, roomId: payload }
   ),
  },

  // Asynchronous actions
  // Each async action should have 3 related synchronous actions:
  // __STARTED, __FAILED, __FINISHED
  async: {
    GET_MESSAGES: ({ dispatch }) => async ({ payload }) => {
      try {
         const chatId = payload
        dispatch({ type: 'GET_MESSAGES__STARTED' })
        const res = await axios.get(`/api/chatrooms/${chatId}/messages`,{params: {
          id: chatId
        }})
        dispatch({ type: 'GET_MESSAGES__FINISHED', payload: res.data })
      } catch (err) {
        dispatch({ type: 'GET_MESSAGES__FAILED', payload: err.response.data })
      }
    },
    ADD_MESSAGE: ({ dispatch }) => async ({ payload }) => {
      try {
        const message = payload.id
        dispatch({ type: 'ADD_MESSAGE__STARTED' })
        const res = await axios.post(`/api/chatrooms/${ message}/messages`,payload)
        dispatch({ type: 'ADD_MESSAGE__FINISHED', payload: res.data })
      } catch (err) {
        dispatch({ type: 'ADD_MESSAGE__FAILED', payload: err.response.data })
      }
    },
    CHANGE_ROOM_ID: ({ dispatch }) => async ({ payload }) => {
      try {
        const id = payload
        dispatch({ type: 'CHANGE_ROOM_ID__STARTED' })
        dispatch({ type: 'CHANGE_ROOM_ID__FINISHED', payload: id })
      } catch (err) {
        dispatch({ type: 'CHANGE_ROOM_ID__FAILED', payload: err.response.data })
      }
    },
  },
}


export default chatroomReducerActions