/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import NotebookDrawer from './notebook-drawer/notebook-drawer';
import NotesDrawer from './notes-drawer/notes-drawer';
import Row from '../UI/row';
import RichTextEditor from './editor/editor';
import { useParams } from 'react-router';
import { useEffect } from 'react';

const layout = () => {
    const { bookId, noteId } = useParams();
    const [showNotesDrawer, setShowNotesDrawer] = useState(false);
    const [showEditor, setShowEditor] = useState(false);

    useEffect(() => {
        setShowNotesDrawer(bookId ? true : false);
    }, [bookId]);

    useEffect(() => {
        setShowEditor(noteId ? true : false);
    }, [noteId]);
    
    return (
        <div className="container-fluid">
            <Row>
                <NotebookDrawer />
                {showNotesDrawer ? <NotesDrawer /> : null}
                {showEditor && showNotesDrawer ? <RichTextEditor /> : null}
            </Row>
        </div>
    );
}

export default layout;
