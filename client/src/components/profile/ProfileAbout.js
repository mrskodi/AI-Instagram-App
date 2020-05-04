import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.name.trim().split(' ')[0];   

    // Hobbies List
    const hobbies = profile.hobbies.map((hobby, index) => (
      <div key={index} className="profile-block">      
        {hobby}
      </div>
    ));

     //  Countries visited
     const countries = profile.countries.map((country, index) => (
      <div key={index} className="profile-block">
        {country}
      </div>
    ));

     // Favorite places
     const places = profile.places.map((place, index) => (
      <div key={index} className="profile-block">
        {place}
      </div>
    ));
  
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body mb-3">
            {isEmpty(profile.bio) ? (<p className="hide">{profile.bio}</p>) : (<p>{profile.bio}</p>) }
            <hr className="charcoal"/>
            {!isEmpty(profile.location) ? (<p><span className="profile-icon"><i className="fas fa-map-marker-alt fa-fw"></i></span> {profile.location}</p>) : (<p className="hide"></p>)}
            {!isEmpty(profile.phone) ? (<p><span className="profile-icon"><i className="fas fa-mobile-alt fa-fw"></i></span> {profile.phone}</p>) : (<p className="hide"></p>)}
            {!isEmpty(profile.website) ? (<p><span className="profile-icon"><i className="fas fa-globe fa-fw"></i></span> {profile.website}</p>) : (<p className="hide"></p>)}
            {!isEmpty(profile.hobbies) ? (<p><span className="profile-icon"><i className="fas fa-heart fa-fw"></i></span> {profile.hobbies}</p>) : (<p className="hide"></p>)}
            {!isEmpty(profile.places) ? (<p><span className="profile-icon"><i className="fas fa-map-pin fa-fw"></i></span> {places}</p>) : (<p className="hide"></p>)}
            {!isEmpty(profile.countries) ? (<p><span className="profile-icon"><i className="fas fa-atlas fa-fw"></i></span> {countries}</p>) : (<p className="hide"></p>)}
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
