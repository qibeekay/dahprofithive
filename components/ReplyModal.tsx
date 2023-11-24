'use client';
import React, { FormEvent, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useModal } from './ModalContext';
import toast from 'react-hot-toast';
import { createReply } from '@/app/api/comment/route';

const ReplyModal = () => {
	const {
		isAddTaskModalOpen,
		closeAddTaskModal,
		replyToCommentId,
		replyToContentId,
	} = useModal();

	const [formData, setFormData] = useState({
		comment: '',
	});

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleReply = async (e: FormEvent) => {
		e.preventDefault();

		// Check if any field is empty
		for (const field in formData) {
			if (formData[field as keyof typeof formData] === '') {
				toast.error(`Comment cannot be empty`);
				return;
			}
		}

		try {
			// create the comment and get the response data
			/*const response = */ await createReply({
				replyBody: formData.comment,
				commentId: replyToCommentId,
				postId: replyToContentId,
			});

			// Clear the textarea by resetting the content field to an empty string
			setFormData((prevFormData) => ({
				...prevFormData,
				comment: '',
			}));

			toast.success('Reply Added');
			// Close the modal after the reply is successfully added
			closeAddTaskModal();
		} catch (error: any) {
			if (error.message === 'Invalid token') {
				toast.error('Please login to reply');
			}
		}
	};

	// console.log(' comment ', replyToCommentId);
	// console.log(' content ', replyToContentId);

	return (
		<div className={isAddTaskModalOpen ? 'visible' : 'hidden'}>
			<div className='fixed z-50 w-full bg-gradient-to-tr from-[#a6c1ee]/30 to-[#fbc2eb]/30  backdrop-blur-lg backdrop-opacity-50 h-screen'>
				<div className='bg-blue-500 w-[40%] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-4 rounded-xl'>
					{/* button */}
					<div className='cursor-pointer' onClick={closeAddTaskModal}>
						<FaTimes />
					</div>

					{/* comment to reply */}
					<div className='mt-5'>
						<form action='' onSubmit={handleReply} className='grid gap-5'>
							<textarea
								className='bg-transparent outline-none h-[5rem]'
								placeholder='Post your reply'
								name='comment'
								id='comment'
								value={formData.comment}
								onChange={handleChange}></textarea>

							<button type='submit' className='w-fit'>
								Reply
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReplyModal;
