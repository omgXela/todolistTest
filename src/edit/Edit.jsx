import React, { Component } from 'react'
import './Edit.css'

class Edit extends Component {
    constructor(props){
        super(props);

        this.noteTitle = props.noteTitle;
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
        this.noteImportance = props.noteImportance;
        this.state = {
            noteTitle: this.noteTitle,
            noteContent: this.noteContent,
            noteImportance: this.noteImportance,
        };

        this.editNote = this.editNote.bind(this);
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputImportance = this.handleUserInputImportance.bind(this);
        this.handleUserInputTitle = this.handleUserInputTitle.bind(this);
    }

        handleRemoveNote(id){
        this.props.removeNote(id);
    }

    handleUserInputImportance(e) {
        this.setState({
            noteImportance: e.target.value,
        })
    }
    handleUserInputTitle(e){
        this.setState({
            noteTitle: e.target.value,
        })
    }

    handleUserInput(e){
        this.setState({
            noteContent: e.target.value,
        })
    }

    editNote(){
        this.props.addNote(
            this.state.newNoteContent,
            this.state.newNoteTitle,
            new Date().toString(),
            this.state.noteReady,
            this.state.newNoteImportance);

        this.setState({
            newNoteContent: '',
            newNoteTitle: '',
            newNoteImportance: '☆',
        })
    }

    render(){
        return(
                <div className="card-header">
                    <div className="form-row">
                        <div className="col-8">
                            <input
                                className="form-control"
                                value={ this.state.noteTitle }
                                onChange={ this.handleUserInputTitle }
                            />
                        </div>
                        <div className="col-4 form-group">
                            <select className="form-control" value={ this.state.noteImportance } onChange={ this.handleUserInputImportance }>
                                <option value="☆">☆</option>
                                <option value="☆☆☆">☆☆☆</option>
                                <option value="☆☆☆☆☆">☆☆☆☆☆</option>
                            </select>
                        </div>
                    </div>
                <div className="card-body">
                    <textarea
                        className="form-control"
                        value={ this.state.noteContent }
                        onChange={ this.handleUserInput }
                        rows="4"
                    />
                </div>
            </div>
        )
    }
}
export default Edit;