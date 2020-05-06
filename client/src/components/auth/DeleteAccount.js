import React, { Component } from 'react';
import { deleteAccount } from '../../action/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DeleteAccount extends Component{
  
  componentWillMount(){
    this.props.deleteAccount();
    
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.auth.isAuthenticated){
      this.props.history.push('/');
    } 
  }
  render()
  {
    return(
      <div>
        <h3>We are so glad you decided to stay back!</h3>
      </div>
    )
  }
}

DeleteAccount.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteAccount }) (DeleteAccount);