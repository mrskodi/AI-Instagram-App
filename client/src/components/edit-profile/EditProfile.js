import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup.js';
// import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../action/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // displaySocialInputs: false,
      handle: '',
      email: '',
      phone: '',
      website: '',
      bio: '',
      gender: '',
      hobbies: '',           
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const hobbiesCSV = profile.hobbies.join(',');

      // If profile field doesnt exist, make empty string
      profile.handle = !isEmpty(profile.email) ? profile.email : '';
      profile.phone = !isEmpty(profile.phone) ? profile.phone : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.bio = !isEmpty(profile.bio)? profile.bio : '';
    
      profile.gender = !isEmpty(profile.gender) ? profile.gender : {};   

      // Set component fields state
      this.setState({
        handle: profile.handle,
        email: profile.email,
        phone: profile.phone,     
        website: profile.website,
        bio: profile.bio,
        gender: profile.gender,
        hobbies: hobbiesCSV      
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {

      handle:  this.state.handle,
      email:  this.state.email,
      phone:  this.state.phone,     
      website:  this.state.website,
      bio:  this.state.bio,
      gender:  this.state.gender,
      hobbies:  this.state.hobbiesCSV
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {  
    const  errors = this.state.errors;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL"
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}               
                  error={errors.email}
                  info="Your email address"
                />
                <TextFieldGroup
                  placeholder="Phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                  info="Phone number"
                />           
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <TextFieldGroup
                  placeholder="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  error={errors.gender}
                  info="Gender"
                />
                <TextFieldGroup
                  placeholder="Hobbies"
                  name="hobbies"
                  value={this.state.hobbies}
                  onChange={this.onChange}
                  error={errors.hobbies}
                  info="Please use comma separated values"
                />  
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
