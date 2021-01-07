

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import NavBar from './Components/NavBar/NavBar'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'

const App = () => (
  <Router>
    <Route component={NavBar} />
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <SignUp/>
      </Route>
      <PrivateRoute path='/'>
        <Home />
      </PrivateRoute>
    </Switch>
  </Router>
)
export default App
