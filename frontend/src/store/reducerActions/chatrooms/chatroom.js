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
  },

  // Asynchronous actions
  // Each async action should have 3 related synchronous actions:
  // __STARTED, __FAILED, __FINISHED
  async: {
    GET_MESSAGES: ({ dispatch }) => async ({ payload }) => {
      try {
         const message = { ...payload }
         console.log('messages ',message)
        dispatch({ type: 'GET_MESSAGES__STARTED' })
        const res = await axios.get(`/api/chatrooms/100/messages`)
        dispatch({ type: 'GET_MESSAGES__FINISHED', payload: res.data })
      } catch (err) {
        dispatch({ type: 'GET_MESSAGES__FAILED', payload: err.response.data })
      }
    },
    ADD_MESSAGE: ({ dispatch }) => async ({ payload }) => {
      try {
          const message = { ...payload }
        dispatch({ type: 'ADD_MESSAGE__STARTED' })
        const res = await axios.post(`/api/chatrooms/100/messages`, message)
        dispatch({ type: 'ADD_MESSAGE__FINISHED', payload: res.data })
      } catch (err) {
        dispatch({ type: 'ADD_MESSAGE__FAILED', payload: err.response.data })
      }
    },
  },
}


export default chatroomReducerActions