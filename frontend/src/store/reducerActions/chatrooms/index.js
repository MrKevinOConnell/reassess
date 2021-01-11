
import chatroomReducerActions from './chatroom'

const chatroomsReducerActions = {
  sync: {
    ...chatroomReducerActions.sync
  },
  async: {
    ...chatroomReducerActions.async
  },
}

export default chatroomsReducerActions
