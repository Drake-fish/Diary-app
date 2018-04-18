import { GET_NOTES, NOTE_STATUS } from '../actionTypes';
import { database } from '../firebase';

export function getNotes(){
  return dispatch => {
    //set the loader to true!!
    dispatch({
      type: NOTE_STATUS,
      payload:true
    });
    //get the notes
    database.on('value', snapshot => {
      dispatch({
        type: GET_NOTES,
        payload: snapshot.val()
      });
      //set the loader to false
      dispatch({
        type: NOTE_STATUS,
        payload:false
      });
      //
    }, ()=> {
      //keep trying as status are changing
      dispatch({
        type: NOTE_STATUS,
        payload: -1
      });
    });
  }
}

export function saveNotes(note){
  return dispatch => {
    database.push(note);
  }
}

export function deleteNote(id){
  return dispatch => database.child(id).remove();
}

export function SaveComment(noteId, comment){
  //find the id of the comment add comment and add that to the note.
  return dispatch => database.child(noteId).child('comments').push(comment);
}
