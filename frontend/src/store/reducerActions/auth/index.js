import loginAuthReducerActions from './login'
import miscellaneousAuthReducerActions from './miscellaneous'

const authReducerActions = {
  sync: {
    ...loginAuthReducerActions.sync,
    ...miscellaneousAuthReducerActions.sync,
  },
  async: {
    ...loginAuthReducerActions.async,
    ...miscellaneousAuthReducerActions.async,
  },
}

export default authReducerActions
