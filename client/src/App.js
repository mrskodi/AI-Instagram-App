import React from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
         <Navbar/>    
        <Route exact path="/" component= {Landing}></Route>
        <Route exact path="/register" component={Register} ></Route>
        <Route exact path="/login" component={Login} ></Route>
        <Footer/>    
      </div>
    </Router>
  );
}

export default App;
