import React from 'react';
import NotebookDrawer from './notebook-drawer/notebook-drawer';
import NotesDrawer from './notes-drawer/notes-drawer';
import Row from '../UI/row';
import Editor from './editor/editor';

const layout = () => {
    return (
        <div className="container-fluid">
            <Row>
                <NotebookDrawer />
                <NotesDrawer/>
                <Editor />
            </Row>
        </div>
    );
}

export default layout;
