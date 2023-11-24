// 'use client';
import Link from 'next/link';
import React, { FormEvent, useState, useEffect } from 'react';
import { Image } from './SinglePosts';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { createComments } from '@/app/api/comment/route';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useModal } from './ModalContext';
import MoreNews from './MoreNews';
import 'react-quill/dist/quill.snow.css';
import Cookies from 'js-cookie';

interface PostDetailsProps {
	title: string;
	author: string;
	body: string;
	images: Image[];
	postId: string;
	category: string[];
}

interface getComments {
	comment: string;
	author: string;
	contentId: string;
	createdAt: string;
	_id: string;
	[key: string]: any;
}

interface getReply {
	replyAuthor: string;
	replyBody: string;
	createdAt: string;
	_id: string;
}

const MainPostDetails = ({
	title,
	author,
	body,
	images,
	postId,
	category,
}: PostDetailsProps) => {
	const [formData, setFormData] = useState({
		comment: '',
	});

	// Add state to track comments visibility
	const [commentsVisible, setCommentsVisible] = useState(false);

	const { openAddTaskModal, replyToCommentId, replyToContentId } = useModal();
	const [comments, setComments] = useState<getComments[]>([]);
	const [reply, setReply] = useState<Record<string, getReply[]>>({});

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleComment = async (e: FormEvent) => {
		e.preventDefault();

		// Check if any field is empty
		for (const field in formData) {
			if (formData[field as keyof typeof formData] === '') {
				toast.error(`Comment cannot be empty`);
				return;
			}
		}

		try {
			// Create the comment and get the response data
			const response = await createComments({
				comment: formData.comment,
				postId,
			});

			// Update the comments state with the new comment
			setComments(
				(prevComments) => [...prevComments, response] as getComments[]
			);

			// Clear the textarea by resetting the content field to an empty string
			setFormData((prevFormData) => ({
				...prevFormData,
				comment: '',
			}));

			toast.success('Comment Added');
		} catch (error: any) {
			toast.error(error.message);
			// console.log(postId);
		}
	};

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get<getComments[]>(
					'https://backend.dahprofithive.com/api/v1/comments/'
				);
				// console.log(response.data);
				setComments(response.data);
			} catch (error) {
				console.error('Error fetching comment:', error);
			}
		};

		fetchPosts();
	}, []);

	// Assuming postId is a string containing the ID of the current post
	const commentsForPost = comments.filter(
		(comment) => comment.contentId === postId
	);

	// console.log(commentsForPost.map((c) => c._id));
	// console.log(commentsForPost);

	useEffect(() => {
		const fetchRepliesForComment = async (commentId: string) => {
			try {
				const response = await axios.get<getReply[]>(
					`https://backend.dahprofithive.com/api/v1/comments/${commentId}/replies`
				);
				// console.log(response);
				return response.data;
			} catch (error) {
				console.error('Error fetching replies:', error);
				return [];
			}
		};

		const fetchAllReplies = async () => {
			const newRepliesMap: Record<string, getReply[]> = {};

			for (const comment of commentsForPost) {
				const commentReplies = await fetchRepliesForComment(comment._id);
				newRepliesMap[comment._id] = commentReplies;
			}

			setReply((prevReply) => ({
				...prevReply, // Preserve the previous state
				...newRepliesMap, // Update with new data
			}));
		};

		// Fetch replies only if commentsForPost or other dependencies change
		if (commentsForPost.length > 0) {
			fetchAllReplies();
		}
	}, [commentsForPost]);

	// Assuming postId is a string containing the ID of the current post
	// const replyForPost = reply.filter(
	// 	(comment) => comment.contentId === postId
	// );

	// Helper function to convert createdAt to "time ago" format
	const getTimeAgo = (createdAt: string): string => {
		const currentTime = new Date();
		const createdAtDate = new Date(createdAt);
		const differenceInSeconds = Math.floor(
			(currentTime.getTime() - createdAtDate.getTime()) / 1000
		);

		if (differenceInSeconds < 60) {
			return 'Less than 1 minute ago';
		} else if (differenceInSeconds < 3600) {
			return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
		} else if (differenceInSeconds < 86400) {
			return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
		} else {
			return `${Math.floor(differenceInSeconds / 86400)} days ago`;
		}
	};

	// Function to toggle comments visibility
	const toggleCommentsVisibility = () => {
		setCommentsVisible(!commentsVisible);
	};

	// console.log('comment main', replyToCommentId);
	// console.log('content main', replyToContentId);

	return (
		<div className='lg:w-[67%] relative pb-20'>
			<div>
				{/* Posts */}
				<div>
					{/* title */}
					<div>
						<h1 className='text-xl font-bold'>{title}</h1>

						{/* category */}
						<ul className='mt-4 mb-7'>
							<li className='bg-[#2F9FF8]/30 text-[#2F9FF8] w-fit px-3 py-[1px] rounded-[4px]'>
								{category}
							</li>
						</ul>
					</div>

					{/* image */}
					{images.map((image) => (
						<div key={image._id}>
							<img className='w-full' src={image.url} alt='' />
						</div>
					))}

					{/* overview body */}
					{/* <div className='my-8 leading-[1.5] text-[#072D4B]/70'>
						<p>{body}</p>
					</div> */}

					<div
						className='ql-editor my-8 text-[#072D4B]/70'
						dangerouslySetInnerHTML={{ __html: body }}
					/>

					{/* published date and author */}
					<div className='text-center pb-7'>
						<p className='text-[#072D4B]/30 pb-1'>
							Published July 5, 2021 - 8:16 pm IST
						</p>

						<p className='pb-7'>by {author}</p>

						<Link href={''} className='text-[#2F9FF8] underline'>
							Back to top
						</Link>
					</div>
				</div>

				{/* comments */}
				<div>
					<form onSubmit={handleComment} className='grid'>
						{/* title */}
						<div className='flex items-center '>
							<p className='w-[30%] font-bold'>Add your comment</p>
							{/* line */}
							<div className='w-full h-[0.5px] bg-[#072D4B]/10'></div>
						</div>

						<textarea
							name='comment'
							id='comment'
							placeholder='Enter your comment here'
							value={formData.comment}
							onChange={handleChange}
							className='bg-[#ECF5F8] outline-none rounded h-[6rem] px-4 py-2 placeholder:text-[#072D4B]/20 mt-2'></textarea>

						<button
							type='submit'
							className='bg-[#2F9FF8] w-fit py-2 px-5 text-white rounded mt-2 mb-4'>
							Post Comment
						</button>
					</form>

					{/* Comment status messages */}

					{/* All comments */}
					<div>
						{/* comment count */}
						<div className='flex items-center'>
							<div
								className='flex items-center gap-1 cursor-pointer'
								onClick={toggleCommentsVisibility}>
								<p className='text-[#2F9FF8] underline'>View All Comment</p>
								<p className='text-[#2F9FF8]'>{commentsForPost.length}</p>
							</div>

							{/* icon */}
							<div></div>
						</div>

						{/* Display comments only if commentsVisible is true */}
						{commentsVisible &&
							commentsForPost.map((comment) => (
								<div key={comment._id}>
									{/* comments */}
									<div className='pt-4'>
										{/* user */}
										<div className='text-[#2F9FF8] font-medium pb-1 flex items-center justify-between'>
											<p className='capitalize'>{comment.author}</p>
											<div className='flex items-center gap-1.5 text-[#072D4B] cursor-pointer'>
												<AiOutlineLike />
												<AiOutlineDislike />
											</div>
										</div>
										{/* comment */}
										<p className='text-[#072D4B]/70'>{comment.comment}</p>
										{/* comment time && delete*/}
										<div className='flex items-center justify-between text-[#072D4B]/40 text-[12px]'>
											<p>{getTimeAgo(comment.createdAt)}</p>
											<Link
												href={''}
												className='text-[#FF8C8C] flex items-center gap-1'>
												<div className='text-[15px]'>
													<FiTrash />
												</div>
												Delete Comment
											</Link>
										</div>
									</div>

									{/* Replies */}
									<div className='border-l-2 border-l-[#FFE8C4] pl-4 my-3 '>
										{reply[comment._id] && reply[comment._id].length > 0 && (
											<div className='grid gap-4'>
												{reply[comment._id].map((item) => (
													<div key={item._id} className=''>
														{/* user */}
														<h1 className='text-[#2F9FF8] font-medium flex items-center justify-between capitalize'>
															{item.replyAuthor}
														</h1>
														{/* reply */}
														<p className='text-[#072D4B]/70'>
															{item.replyBody}
														</p>
														{/* reply time */}
														<div className='flex items-center justify-between text-[#072D4B]/40 text-[12px]'>
															<p>{getTimeAgo(item.createdAt)}</p>
														</div>
													</div>
												))}
											</div>
										)}
									</div>

									{/* Reply form */}
									<div>
										<p
											onClick={() =>
												openAddTaskModal({
													commentId: comment._id,
													postId: comment.contentId,
												})
											}
											className='text-sm text-[#2F9FF8] cursor-pointer'>
											Reply
										</p>
									</div>
								</div>
							))}
					</div>
				</div>

				{/* other news */}
				<div className='mt-10'>
					<div className='flex items-center '>
						<p className='w-[30%] font-bold'>More News for you</p>
						{/* line */}
						<div className='w-full h-[0.5px] bg-[#072D4B]/10'></div>
					</div>

					<div className='pt-3'>
						<MoreNews />
					</div>
				</div>
				<Toaster />
			</div>
		</div>
	);
};

export default MainPostDetails;
