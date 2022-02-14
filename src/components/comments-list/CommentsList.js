import React from 'react'

function CommentsList({comments}) {
	
	return (
		<div className='comments-container'>
			<ul className='comments-list'>
				{comments.map(comment => (
					<li key={comment.id}>
						<dt>{new Date(comment.date).toLocaleDateString()}</dt>
						<dd>{comment.text}</dd>
					</li>
				))}
			</ul>
		</div>
	)
}

export default CommentsList;
