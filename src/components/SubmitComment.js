import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SaveComment } from '../actions/notesAction';

class SubmitComment extends Component{
  constructor(props){
    super(props);
    this.state={
      commentBody: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      commentBody: e.target.value
    });
  }
  handleSubmit= (e) =>{
    e.preventDefault();
    const comment = {
      commentBody: this.state.commentBody,
      uid: this.props.uid
    }
    this.props.SaveComment(this.props.uid, comment);
    this.setState({
      commentBody:''
    })

  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <textarea
              value={this.state.commentBody}
              onChange={this.handleChange}
              type="text"
              name="commentBody"
              className="form-control no-borer"
              placeholder="write comment!"
              required
              />
          </div>
          <div className="form-group">
            <button className="btn btn-success">Add Comment</button>
          </div>
        </form>
      </div>
    );

  }
}
function mapStateToProps(state, ownProps){
  return{
    uid: state.user.uid

  }
}
export default connect(mapStateToProps, { SaveComment })(SubmitComment);
