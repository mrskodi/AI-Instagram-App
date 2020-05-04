import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../action/profileActions';
import { GET_PROFILES } from '../../action/dispatchTypes';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;  
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-info mb-3 float-left">
                Back To Profiles
              </Link>
              </div>
            <div className="col-md-6" />
          </div>  
          <ProfileHeader profile={profile} />
          <div  className="row">  
            <div className="col-md-12">
              <Link to="/edit-profile" className="btn btn-light float-right">
              <i className="fas fa-user-edit mr-1" /> Edit Profile
              </Link>
            </div>
          </div>
          <ProfileAbout profile={profile} />
        </div>

      );
    }

    return (
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);