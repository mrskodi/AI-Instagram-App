import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../action/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

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

    // Call loginUser action
    this.props.loginUser(user);
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const  errors = this.state.errors;
    return (
      <div className="login ">
        <div className="landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Log in to your account</p>
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <TextFieldGroup name="email" 
                                  placeholder="Email" 
                                  value={this.state.email} 
                                  type="email" 
                                  onChange={this.onChange.bind(this)} 
                                  error={errors.email}
                  />
                </div>                
                <div className="form-group">
                  <TextFieldGroup name="password"
                                  placeholder="Password"
                                  value={this.state.password}
                                  type="password"
                                  onChange={this.onChange.bind(this)}
                                  error={errors.password}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" value="Log In" />
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);