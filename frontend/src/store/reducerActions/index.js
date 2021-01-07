import authReducerActions from './auth'

const reducerActions = {
  sync: {
    ...authReducerActions.sync,
  },
  async: {
    ...authReducerActions.async,
  },
}
export default reducerActions
