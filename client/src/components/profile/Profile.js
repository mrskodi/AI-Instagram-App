// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getCurrentProfile, getProfileByHandle } from '../../action/profileActions';

// class Profile extends Component{

// componentDidMount(){
//   this.props.getCurrentProfile();
// }


// // getProfile(){
// //   this.props.getProfileByHandle();
// // }

//   render(){
//     const { profile } = this.props.profile;
//     let profileContent;

//     profileContent = (<div>

//                       </div>)
//     return(
//       <div>
//         <h1>Get Current profile Details here...</h1>
//         <button type="button"
//                 name="getProfile"
//                 onClick={this.getCurrentProfile.bind(this)}>
//           Get Profile
//         </button>
//         <div>
        

//         </div>
//       </div>
//     )
//   }
// }

// Profile.propTypes = {
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired,
//   getCurrentProfile: PropTypes.func.isRequired
// }

// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// })

// export default connect(mapStateToProps, { getCurrentProfile, getProfileByHandle }) (Profile);