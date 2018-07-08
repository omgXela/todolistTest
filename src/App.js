import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {

  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.readyNote = this.readyNote.bind(this);
    this.setFilter = this.setFilter.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes');

    this.state = {
      notes: [],
    }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
          noteTitle: snap.val().noteTitle,
          noteCreate: snap.val().noteCreate,
          noteReady: snap.val().noteReady,
          noteImportance: snap.val().noteImportance,
      });

      this.setState({
        notes: previousNotes
      })
    });

    this.database.on('child_removed', snap => {
      for(let i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }



  addNote(content, title, create, ready, importance){
    this.database.push().set({
        noteTitle: title,
        noteContent: content,
        noteCreate: create,
        noteReady: ready,
        noteImportance: importance,});
  }

  removeNote(noteId){
    console.log("from the parent: " + noteId);
    this.database.child(noteId).remove();
  }

  readyNote(ready, id, title, create, content, importance){
      this.database.child(id).remove();
      this.database.push().set({
          noteTitle: title,
          noteContent: content,
          noteCreate: create,
          noteReady: ready,
          noteImportance: importance,
      });
  };

    setFilter(e) {
        this.setState({
            currentFilter: e.target.value
        });
    }


  render() {

    return (
      <div className="container">
        <div className="jumbotron">
          <div className="justify-content-center">
              <h1 className="font-weight-bold">To-Do list</h1>
          </div>
        </div>
        <div className="card-body">
          {                this.state.notes.map((note) => {
              return (
                  <Note
                      noteTitle={note.noteTitle}
                      noteContent={note.noteContent}
                      noteCreate={note.noteCreate}
                      noteReady={note.noteReady}
                      noteImportance={note.noteImportance}
                      noteId={note.id}
                      key={note.id}
                      removeNote ={ this.removeNote }
                      readyNote ={ this.readyNote }/>
              )
            })
          }
        </div>
        <div className="card-footer">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
