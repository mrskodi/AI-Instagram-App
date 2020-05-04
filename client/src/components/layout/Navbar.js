import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../action/authActions';
import profileReducer from '../../reducers/profileReducer';

class Navbar extends Component {
  onLogoutClick(eventInfo){
    eventInfo.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const {isAuthenticated, user} = this.props.auth;
    const guestLinks = (    
      <ul className="navbar-nav ml-auto">      
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>              
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>              
        </li>
     </ul>);

    const authLinks = (
      <ul className="navbar-nav ml-auto">  
        <li className="nav-item">
          <Link className="nav-link" to={`/profiles/${user.handle}`}>
          <img className="rounded-circle" src={user.avatar} alt={user.name} style={{width: '25px', marginRight: '5px'}} 
            title="You must have a gravatar connected to your email to display an image.">             
          </img>
          {user.handle}
        </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/postForm"><i className="fas fa-plus"></i></Link>              
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard"><i className="fas fa-map-marked"></i></Link>              
        </li>
        <li className="nav-item">      
          <Link className="nav-link" to="/profiles"><i className="fas fa-user-friends"></i></Link>
        </li>    
        <li className="nav-item">
         <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">          
         Logout</a>           
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark mb-4 bg-main">
        <div className="container">
          <Link className="navbar-brand" to="/">Wander</Link>             
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
            
            </ul>
            {isAuthenticated ? authLinks : guestLinks}   
          </div>
        </div>
      </nav>
    )
  }
}

//Define the component dependencies that should be available to load component and run successfully
Navbar.propTypes = {
  logoutUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired  
}

//Read the data from store and map it to props
const mapStateToProps = (state) =>({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);