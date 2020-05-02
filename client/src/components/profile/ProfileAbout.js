import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];   

    // Hobbies List
    const hobbies = profile.hobbies.map((hobby, index) => (
      <div key={index} className="p-3">      
        <i className="fa" /> {hobby}
      </div>
    ));

     // Favorite books
     const books = profile.favorites.books.map((book, index) => (
      <div key={index} className="p-3">
        <i className="fa" /> {book}
      </div>
    ));

     //  Favorite movies
     const movies = profile.favorites.movies.map((movie, index) => (
      <div key={index} className="p-3">
        <i className="fa" /> {movie}
      </div>
    ));

     //  Favorite outdoor ativities
     const outdoorActivities = profile.favorites.outdoorActivities.map((outdoorActivity, index) => (
      <div key={index} className="p-3">
        <i className="fa" /> {outdoorActivity}
      </div>
    ));
  
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (<span>{firstName} does not have a bio</span>) : (<span>{profile.bio}</span>)}
            </p>
            <hr />           
          </div>
        </div>
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s details</h3>
            <p className="lead">
              {!isEmpty(profile.gender) ? (<span>Gender : {profile.gender}</span>) : (<span>Gender : </span>)}
            </p>
            <p className="lead">
              {!isEmpty(profile.phone) ? (<span>Phone : {profile.phone}</span>) : (<span>Phone : </span>)}
            </p>
            <p className="lead">
              {!isEmpty(profile.website) ? (<span>Website : {profile.website}</span>) : (<span>Website : </span>)}
            </p>
            <p className="lead">
               <span>Hobbies : {hobbies}</span>
            </p>
            <p className="lead">
               <span>Favorite books : {books}</span>
            </p>
            <p className="lead">
               <span>Favorite movies : {movies}</span>
            </p>
            <p className="lead">
               <span>Favorite outdoor activities : {outdoorActivities}</span>
            </p>
                
            <hr />           
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
