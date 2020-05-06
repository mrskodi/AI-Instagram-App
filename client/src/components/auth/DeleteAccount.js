import React, { Component } from 'react';
import { deleteAccount } from '../../action/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DeleteAccount extends Component{
  
  componentWillMount(){
    this.props.deleteAccount();
  }
  render(){
    return(
      <div>

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