import React from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import { Provider } from 'react-redux';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './components/dashboard/dashboard';
import store from './store';
import setAuthToken from '././utils/setAuthToken';
import './App.css';
import { SET_CURRENT_USER } from './action/dispatchTypes';
import jwt_decode from 'jwt-decode';
import { logoutUser } from './action/authActions';
import { Component } from 'react';
import PostForm from './components/posts/PostForm';
import Post from './components/posts/Post';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import EditProfile from './components/edit-profile/Edit-Profile';
import LikesProfiles from './components/profiles/LikesProfiles';
import NotFound from './components/profile/NotFound';
import DeleteAccount from './components/auth/DeleteAccount';

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
    //window.location.href = '/login'; 
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

            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/postForm' component={PostForm}/>
            </Switch>

            {/* <Switch>
              <PrivateRoute exact path='post/id/:id' component={Post}/>
            </Switch> */}

            <Route exact path="/post/id/:id" component={Post}></Route>

            <Switch>
              <PrivateRoute exact path='/profiles' component={Profiles}/>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/profiles/:handle' component={Profile}/>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/likesProfiles/:id' component={LikesProfiles}/>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/not-found' component={NotFound}/>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/delete-account' component={DeleteAccount}/>
            </Switch>
            <Footer/>    
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
