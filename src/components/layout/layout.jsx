import React from 'react';
import NotebookDrawer from './notebook-drawer/notebook-drawer';
import NotesDrawer from './notes-drawer/notes-drawer';
import Row from '../UI/row';
import RichTextEditor from './editor/editor';

const layout = () => {
    return (
        <div className="container-fluid">
            <Row>
                <NotebookDrawer />
                <NotesDrawer/>
                <RichTextEditor />
            </Row>
        </div>
    );
}

export default layout;
