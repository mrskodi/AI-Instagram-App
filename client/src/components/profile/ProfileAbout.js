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

     //  Countries visited
     const countries = profile.countries.map((countries, index) => (
      <div key={index} className="p-3">
        <i className="fa" /> {countries}
      </div>
    ));

     // Favorite places
     const places = profile.favorites.places.map((book, index) => (
      <div key={index} className="p-3">
        <i className="fa" /> {places}
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
            {isEmpty(profile.bio) ? (<p className="hide">{firstName} does not have a bio.</p>) : (<p>{profile.bio}</p>) }
            <hr />
            {!isEmpty(profile.gender) ? (<p>Gender: {profile.gender}</p>) : (<p className="hide">Gender: </p>)}
            {!isEmpty(profile.phone) ? (<p>Phone: {profile.phone}</p>) : (<p className="hide">Phone: </p>)}
            {!isEmpty(profile.website) ? (<p>Website: {profile.website}</p>) : (<p className="hide">Website: </p>)}
            {!isEmpty(profile.hobbies) ? (<p>Hobbies: {profile.hobbies}</p>) : (<p className="hide">Hobbies: {hobbies}</p>)}
            {!isEmpty(profile.places) ? (<p>Favorite places: {places}</p>) : (<p className="hide">Favorite places: {places}</p>)}
            {!isEmpty(profile.countries) ? (<p>Favorite countries : {countries}</p>) : (<p className="hide">Favorite countries: {countries}</p>)}
            {!isEmpty(profile.outdoorActivities) ? (<p>Favorite outdoor activities: {outdoorActivities}</p>) : (<p className="hide">Favorite outdoor activities: {outdoorActivities}</p>)}         
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
