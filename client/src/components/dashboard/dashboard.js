import React, { Component } from 'react';
import Posts from '../posts/Posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

class Dashboard extends Component{
  render(){
    const { loading } = this.props;
    let dashboardContent;

    if(loading){
      dashboardContent = <Spinner/>
    }else{
      dashboardContent= <Posts/>
    }
    return(
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loading: state.post.loading
})

export default connect(mapStateToProps, null) (Dashboard);