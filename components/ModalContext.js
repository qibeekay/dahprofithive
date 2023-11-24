'use client';
// ModalContext.js
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
	const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
	const [replyToCommentId, setReplyToCommentId] = useState(null);
	const [replyToContentId, setReplyToContentId] = useState(null);

	const openAddTaskModal = ({ commentId, postId }) => {
		setReplyToCommentId(commentId);
		setReplyToContentId(postId);
		setIsAddTaskModalOpen(true);
	};

	const closeAddTaskModal = () => {
		setReplyToCommentId(null);
		setReplyToContentId(null);
		setIsAddTaskModalOpen(false);
	};

	return (
		<ModalContext.Provider
			value={{
				isAddTaskModalOpen,
				openAddTaskModal,
				closeAddTaskModal,
				replyToCommentId,
				replyToContentId,
			}}>
			{children}
		</ModalContext.Provider>
	);
}

export function useModal() {
	return useContext(ModalContext);
}
