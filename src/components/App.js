import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getNotes, saveNotes, deleteNote } from '../actions/notesAction';
import { getUser } from '../actions/userActions';
import NoteCard from './NoteCard';
import { Link } from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    //state
    this.state={
      title:'',
      body:'',
      notes:'',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const note = {
        title: this.state.title,
        body: this.state.body,
        uid: this.props.user.uid
    }
    this.props.saveNotes(note);
    this.setState({
      title:'',
      body:'',
    })
  }

  //render posts
  renderNotes = () => {
    return _.map(this.props.notes, (note, key)=>{
      return(
        <NoteCard key={key}>
          <Link to={`/${key}`}>
            <h2>{note.title}</h2>
            <h4>{note.body}</h4>
          </Link>
          { note.uid === this.props.user.uid && (
          <button className="btn btn-danger btn-xs" onClick={()=>this.props.deleteNote(key)}>DELETE</button>
        )}
        </NoteCard>
      )
    });
  }

  render() {
    console.log(this.state.notes)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                onChange={this.handleChange}
                type="text"
                name="title"
                value={this.state.title}
                className="form-control no-border"
                placeholder="Title..."
                required/>
                <textarea
                onChange={this.handleChange}
                value={this.state.body}
                type="text"
                name="body"
                className="form-control no-border"
                placeholder="Body"
                required/>
              </div>
              <div className="form-group">
                <button className="btn btn-primary col-sm-12">Submit</button>
              </div>
            </form>
            { this.renderNotes() }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    notes: state.notes,
    user: state.user
  }
}

export default connect(mapStateToProps, {getNotes, saveNotes, deleteNote, getUser} )(App);
