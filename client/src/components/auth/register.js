import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../action/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {

  constructor(){
      super(); 
      this.state={
          name:'',
          email:'',
          password:'',
          password2:'',
          phone:'',
          handle:'',           
          errors:{}
      }
      //with below assignment we can write just onChange={this.onChange} for all textboxes below
      //this.onChange = this.onChange.bind(this);
  }

  onChange(eventInfo){
    this.setState({[eventInfo.target.name]: eventInfo.target.value})
  }

  onSubmit(eventInfo){
    //Prevents submit button from submitting the form
    eventInfo.preventDefault();
    const newUser={
      name: this.state.name,
      email: this.state.email,
      password:this.state.password,
      password2: this.state.password2,
      phone:this.state.phone,
      handle:this.state.handle           
    };

    this.props.registerUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const { errors } = this.state;     
    // Another way to write above statement using deconstruction  
    //const {errors} = this.state;

    return (
      <div className="register">
        <div className="landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your account</p>
                <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <TextFieldGroup name="name"
                                  type="text"
                                  placeholder="Name"
                                  value={this.state.name}
                                  onChange={this.onChange.bind(this)}
                                  error={errors.name}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup name="email"
                                  type="email"
                                  placeholder="Email"
                                  value={this.state.email}
                                  onChange={this.onChange.bind(this)}
                                  info="This site uses Gravatar. To upload a profile image please provide a Gravatar email."
                                  error={errors.email}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup name="password"
                                  type="password"
                                  placeholder="Password"
                                  value={this.state.password}
                                  onChange={this.onChange.bind(this)}
                                  info="Your password needs to have at least 1 digit, 1 lowercase, 1 uppercase and 1 special character."
                                  error={errors.password}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup name="password2"
                                  type="password"
                                  placeholder="Confirm Password"
                                  value={this.state.password2}
                                  onChange={this.onChange.bind(this)}
                                  error={errors.password2}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup name="phone"
                                  type="text"
                                  placeholder="Phone"
                                  value={this.state.phone}
                                  onChange={this.onChange.bind(this)}
                                  error={errors.phone}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup name="handle"
                                  type="text"
                                  placeholder="handle"
                                  value={this.state.handle}
                                  onChange={this.onChange.bind(this)}
                                  error={errors.handle}
                                  info="A unique handle for your account. You will be identified with this handle througout the app."
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" value="Sign Up" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(Register);
