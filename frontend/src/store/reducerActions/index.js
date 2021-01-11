import authReducerActions from './auth'
import chatroomsReducerActions from './chatrooms'

const reducerActions = {
  sync: {
    ...authReducerActions.sync,
    ...chatroomsReducerActions.sync,
  },
  async: {
    ...authReducerActions.async,
    ...chatroomsReducerActions.async
  },
}
export default reducerActions
