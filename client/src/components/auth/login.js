import React, { Component } from 'react';
//import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../../action/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(eventInfo) {
    this.setState({ [eventInfo.target.name]: eventInfo.target.value });
  }

  onSubmit(eventInfo) {
    eventInfo.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    // axios
    //   .post('/api/users/login', user)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));

    // loginUser is now added to the property bag of Login component
    // Send the user data to loginUser function
    this.props.loginUser(user);
  }

  render() {
    const  errors = this.state.errors;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Log in to your account</p>
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <input type="text" className={classnames("form-control form-control-lg", {"is-invalid": errors.email})} placeholder="Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>                
                <div className="form-group">
                  <input type="password" className={classnames("form-control form-control-lg", {"is-invalid": errors.password})} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)}/>
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" value="Log In" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { loginUser })(Login);