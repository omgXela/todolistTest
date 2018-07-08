import React, { Component } from 'react';
import Edit from '../edit/Edit'
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component{
    constructor(props){
        super(props);
        this.noteTitle = props.noteTitle;
        this.noteContent = props.noteContent; 
        this.noteId = props.noteId;
        this.noteCreate = props.noteCreate;
        this.noteReady = props.noteReady;
        this.noteImportance = props.noteImportance;
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.handleReadyNote = this.handleReadyNote.bind(this);
        this.editNote = this.editNote.bind(this);

        this.state = {
            editable: false,
        }
    }

    handleRemoveNote(id){
        this.props.removeNote(id);
    }

    handleReadyNote(id, title, create, content, importance) {
        this.props.readyNote(new Date().toString(), id, title, create, content, importance);
    }

    editNote() {
        this.setState({
            editable: !this.state.editable,
        })
    }

    render(){
        return(
            <div className="card">
                {this.state.editable ? <Edit
                    noteTitle = {this.noteTitle}
                    noteContent = {this.noteContent}
                    noteId = {this.noteId}
                    noteImportance = {this.noteImportance}/> : <div>
                    <div className="card-header">
                        <button
                            className="btn btn-outline-success"
                            onClick={() => this.handleReadyNote(
                                this.noteId,
                                this.noteTitle,
                                this.noteCreate,
                                this.noteContent,
                                this.noteImportance,
                            )}>✓</button>
                        <span className="card-title">{ this.noteTitle }</span>
                        <span className="text-right">{ this.noteImportance }</span>
                    </div>
                    <div className="card-body">
                        <span>Created: { this.noteCreate }</span>
                        {this.noteReady ? <h3 style={{color: 'green'}}>Ready: { this.noteReady }</h3> : null}
                        <div className="col text-left">
                            <span className="card-body">{ this.noteContent }</span>
                        </div>
                    </div>
                </div>}

                <div className="card-footer">
                    <div className=" text-right">
                        <span className="btn btn-outline-warning" onClick={this.editNote}>Edit</span>
                        <span className="btn btn-outline-danger" onClick={() => this.handleRemoveNote(this.noteId)}>&times;</span>
                    </div>
                </div>
            </div>

        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string,
    noteTitle: PropTypes.string,
    noteCreate: PropTypes.string,
    noteReady: PropTypes.string,
    noteImportance: PropTypes.string,
};

export default Note;
