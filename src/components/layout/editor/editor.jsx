/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Appbar from './app-bar';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router';
import axios from '../../axios';

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
	'align', 'image',
	'color', 'background'
];

const useStyles = makeStyles((theme) => ({
	editorContainer: {
		flexGrow: 1,
		flexBasis: 0
	}
}));

const richTextEditor = (props) => {
	const classes = useStyles();
	const { bookId, noteId } = useParams();
	const debounceTimer = useRef(null);
	const history = useHistory();
	const [comment, setComment] = useState('');
	const [tags, setTags] = useState([]);

	const debounce = (func, delay) => { 
		return function() { 
			const context = this;
			const args = arguments;
			clearTimeout(debounceTimer.current);
			debounceTimer.current = setTimeout(() => func.apply(context, args), delay) 
		};
	};

	const rteChange = (content, delta, source, editor) => {
		console.log(editor.getHTML()); // rich text
		console.log(editor.getText()); // plain text
		const debounceCB = () => {
			if (editor.getHTML() === comment) {
				return;
			}
			btoa(unescape(encodeURIComponent(editor.getHTML())))
			const subHeader = editor.getText().replace(/\n/, ' ').substring(0, Math.min(20, editor.getText().length));
			axios.put(`/book/${bookId}/note/${noteId}`, {content: window.btoa(unescape(encodeURIComponent(editor.getHTML()))), subHeader: subHeader})
				.then(res => {
					setComment(editor.getHTML());
				})
				.catch(err => {
					console.error(err.response.data);
				});
		};
		debounce(debounceCB, 3000)();
	};

	useEffect(() => {
		const resizeHandler = () => {
			const editor = document.querySelector('.ql-editor');
			editor.style.height = window.innerHeight - editor.getBoundingClientRect().top + "px";
		};
		resizeHandler();
		window.addEventListener('resize', resizeHandler);
		return () => {
			window.removeEventListener('resize', resizeHandler);
		}
	}, []);

	useEffect(() => {
		noteId && axios.get(`/book/${bookId}/note/${noteId}`)
			.then((res) => {
				console.log(res.data.data);
				setComment(window.atob(res.data.data.note.content));
				setTags(res.data.data.tags);
			}).catch(err => {
				// history.goBack();
			})
	}, [noteId, bookId]);

	return (
		<div className={classes.editorContainer}>
			<Appbar tags={tags} setTags={setTags} />
			<ReactQuill theme="snow" modules={modules}
				formats={formats} onChange={rteChange}
				value={comment || ''} />
		</div>
	);

}

export default richTextEditor;