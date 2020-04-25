import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../action/authActions';
import PropTypes from 'prop-types';

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
    const { user } = this.props.auth
    // Another way to write above statement using deconstruction  
    //const {errors} = this.state;

    return (
      <div className="register">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your account</p>
                <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classnames("form-control form-control-lg", {'is-invalid': errors.name})} 
                    placeholder="Name" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.onChange.bind(this)}
                  />                        
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classnames("form-control form-control-lg", {'is-invalid': errors.email})} 
                    placeholder="Email" 
                    name="email" 
                    value={this.state.email} 
                    onChange={this.onChange.bind(this)} 
                  />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    <small className="form-text text-muted">This site uses Gravatar. To upload a profile image please provide a Gravatar email.</small>
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className= {classnames("form-control form-control-lg", {'is-invalid': errors.password})}
                    placeholder="Password" name="password" 
                    value={this.state.password} 
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className= {classnames("form-control form-control-lg", {'is-invalid': errors.password2})} 
                    placeholder="Confirm Password" 
                    name="password2" 
                    value={this.state.password2} 
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className= {classnames("form-control form-control-lg", {'is-invalid': errors.phone})} 
                    placeholder="Phone number" 
                    name="phone" 
                    value={this.state.phone} 
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="handle" 
                    className= {classnames("form-control form-control-lg", {'is-invalid': errors.handle})} 
                    placeholder="Handle" 
                    name="handle" 
                    value={this.state.handle} 
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.handle && (<div className="invalid-feedback">{errors.handle}</div>)}
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
