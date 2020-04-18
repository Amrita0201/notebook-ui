/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Appbar from './app-bar';
import { makeStyles } from '@material-ui/core/styles';

const modules = {
	toolbar: [
		[{ 'font': [] }],
		[{ 'size': ['small', false, 'large', 'huge'] }],
		['bold', 'italic', 'underline'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'align': [] }],
		[{ 'color': [] }, { 'background': [] }],
		['clean']
	]
};

const formats = [
	'font',
	'size',
	'bold', 'italic', 'underline',
	'list', 'bullet',
	'align',
	'color', 'background'
];

const useStyles = makeStyles((theme) => ({
	editorContainer: {
		display: 'inline-flex',
		flexDirection: 'column',
		flexGrow: 1,
		'& > .quill': {
			display: 'inline-flex',
			flexDirection: 'column',
			flex: '1 1 auto',
			'& > .ql-container': {
				overflowY: 'auto'
			}
		}
	}
}));

const richTextEditor = (props) => {
	const classes = useStyles();
	const [comment, setComment] = useState('');

	const rteChange = (content, delta, source, editor) => {
		console.log(editor.getHTML()); // rich text
		console.log(editor.getText()); // plain text
		console.log(editor.getLength()); // number of characters
	}

	return (
		<div className={classes.editorContainer}>
			<Appbar />
			<ReactQuill theme="snow" modules={modules}
				formats={formats} onChange={rteChange}
				value={comment || ''} />
		</div>
	);

}

export default richTextEditor;