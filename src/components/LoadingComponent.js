import React, { Component } from 'react';
import { connect } from 'react-redux';
// with withRouter you can get access to the history object property
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/userActions';
import { getNotes } from '../actions/notesAction';


class LoadingComponent extends Component{
  componentWillMount(){
    const {userLoading, notesLoading} = this.props;
    //if we haven't tried to load the user, load user.
    if(userLoading === undefined) {
      this.props.getUser();
    }
    //if we haven't tried to get notes load notes.
    if(notesLoading === undefined) {
      this.props.getNotes();
    }
  }
  componentWillReceiveProps(nextProps){
    //wait for user to get authenticated and try to load notes
    if(nextProps.notesLoading === -1 && nextProps.user !== null){
      this.props.getNotes();
    }
  }
  render(){
    const { userLoading, notesLoading, children } = this.props;
    if((!userLoading && !notesLoading) || this.props.user === null){
      return <div>{ children }</div>
    }else{
      return (
              <div>
                <h2>Loading...</h2>
              </div>
              );
    }
  }
}

function mapStateToProps(state, ownProps){
  return {
    notes: state.notes,
    notesLoading: state.loading.notes,
    user: state.user,
    userLoading: state.loading.user
  }
}

export default withRouter(connect(mapStateToProps, {getNotes, getUser} )(LoadingComponent));
