import React, { Component } from 'react';
import { connect } from 'react-redux';
import { googleLogin, twitterLogin } from '../actions/userActions';
class Login extends Component {
  componentWillMount(){
    const { user, history } = this.props;
    if(user != null){
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.user != null){
      nextProps.history.push('/');
    }
  }
  render(){
    return (
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-sm-12 jumbotron">
            <h1>
              DIARY | {new Date().getFullYear()} Login with your Favorite <b>Social Network</b>
            </h1>
          </div>
          <div className="col-sm-6">
            <button onClick={this.props.googleLogin} className="btn btn-danger btn-lg">
              Login with Google
            </button>
          </div>
          <div className="col-sm-6">
            <button onClick={this.props.twitterLogin} className="btn btn-success btn-lg">
              Login with Twitter
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { googleLogin, twitterLogin } )(Login);
