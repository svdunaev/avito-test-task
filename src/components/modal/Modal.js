import React, { useCallback, useEffect, useState } from 'react'
import ReactDom from 'react-dom';
import './Modal.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from 'react-loader-spinner'
import CommentsList from '../comments-list/CommentsList';
import EmptyCommentsSection from '../empty-comments-section/EmptyCommentsSection';
import {nanoid} from 'nanoid';

const API_URL = 'https://boiling-refuge-66454.herokuapp.com/images';

function Modal({ onClose, imgId }) {

	const [state, setState] = useState(
		{
			isLoading: true,
			imgData: {},
			commentslength: 0,
		}
	);

	const { isLoading, imgData } = state;

	const [nameValue, setNameValue] = useState('');
	const [textValue, setTextValue] = useState('');

	const fetchImageData = useCallback(async () => {
		await fetch(`${API_URL}/${imgId}`)
			.then(res => res.json())
			.then(imgData => setState(
				{
					isLoading: false,
					imgData: imgData,
					commentslength: imgData.comments.length,
				},
			));
	}, [imgId]);

 
	useEffect(() => {
		fetchImageData()
	}, [fetchImageData]);

	const handleUserNameChange = (evt) => {
		setNameValue(evt.target.value)
	};

	const handleCommentChange = (evt) => {
		setTextValue(evt.target.value)
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const comments = imgData.comments;
		const newComment = {
			name: nameValue,
			comment: textValue,
		};

		const commentToState = {
			text: textValue,
			id: nanoid(),
			date: new Date().toLocaleDateString(),
		};

		fetch(`${API_URL}/${imgId}/comments`, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(newComment),
	});

		setState((prev) => {
			return {
				...prev,
				imgData: {
					...prev.imgData,
					comments: [...comments, commentToState],
				},
			}
		})
	};	
 
	return ReactDom.createPortal(
		<div className='overlay'>
			<div className='modal'>
				<div className='modal-content-wrapper'>
					{isLoading ? <TailSpin /> :
						<>
							<img src={imgData.url} alt={imgData.id}></img>
							<div className='closebutton' onClick={onClose}></div>
							{imgData.comments.length === 0 ? <EmptyCommentsSection /> : <CommentsList comments={imgData.comments} />}
							<form className='comment-form'>
								<input name='userName'
									type='text'
									placeholder='Ваше имя'
									onChange={handleUserNameChange}
								/>
								<input name='userComment'
									type='text'
									placeholder='Ваш комментарий'
									onChange={handleCommentChange}
								/>
								<button
									type='submit'
									onClick={handleSubmit}
								>Отправить комментарий</button>
							</form>
						</>
					}
				</div>
			</div>
		</div>,
		document.getElementById('portal')
	)
}

export default Modal;
