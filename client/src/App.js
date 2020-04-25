import React from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from '././utils/setAuthToken';
import './App.css';
import { SET_CURRENT_USER } from './action/dispatchTypes';
import jwt_decode from 'jwt-decode';
import { logoutUser } from './action/authActions';
import { Component } from 'react';

// Check for token in localStorage and route accordingly
if(localStorage.jwtToken){
  // decode the token
  const decoded = jwt_decode(localStorage.jwtToken);
  
  //Check for token expiry
  const currentTime = Date.now() / 1000; 
  if(decoded.exp < currentTime){
    //Dispatch Logout user call
    store.dispatch(logoutUser());
    //Redirect user login
    window.location.href = '/login'; 
  }

  // set auth header
  setAuthToken(localStorage.jwtToken);
  
  // dispatch call to write decoded data to store
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>    
        <Router>
          <div className="App">
            <Navbar/>    
            <Route exact path="/" component= {Landing}></Route>
            <Route exact path="/register" component={Register} ></Route>
            <Route exact path="/login" component={Login} ></Route>
            <Footer/>    
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
