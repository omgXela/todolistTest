import React, { Component } from 'react';
import './NoteForm.css';


class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            expireDate: '',
            newNoteContent: '',
            newNoteTitle: '',
            noteCreate: '',
            noteReady: '',
            newNoteImportance: '☆',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputTitle = this.handleUserInputTitle.bind(this);
        this.writeNote = this.writeNote.bind(this);
        this.handleUserInputImportance = this.handleUserInputImportance.bind(this);
    }

    handleUserInput(e){
        this.setState({
            newNoteContent: e.target.value,
        })
    }

    handleUserInputImportance(e){
        this.setState({
            newNoteImportance: e.target.value,
        })
    }

    handleUserInputTitle(e){
        this.setState({
            newNoteTitle: e.target.value,
        })
    }

    writeNote(){

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
            <div className="card">
                <div className="form-row">
                    <div className="col">
                        <input
                            className="form-control"
                            placeholder="Write Title..."
                            value={this.state.newNoteTitle}
                            onChange={this.handleUserInputTitle}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <select className="form-control" value={this.state.newNoteImportance} onChange={this.handleUserInputImportance}>
                            <option value="☆">☆</option>
                            <option value="☆☆☆">☆☆☆</option>
                            <option value="☆☆☆☆☆">☆☆☆☆☆</option>
                        </select>
                    </div>
                </div>
                <input
                    className="input-group-text"
                    placeholder="Write Description..."
                    value={this.state.newNoteContent}
                    onChange={this.handleUserInput}
                />

                <button className="btn btn-primary"
                onClick={this.writeNote}>Add</button>
            </div>
        )
    }
}

export default NoteForm;