import React from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Footer from './components/Footer'

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Landing></Landing>
      <Footer></Footer>
    </div>
  );
}

export default App;
