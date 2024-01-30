'use client';
import { MainHeader } from '@/components';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import AdminHeader from '@/components/admin/AdminHeader';

interface Post {
	_id: string;
	title: string;
	body: string;
	isPremium: boolean;
	category: string[];
	image: string;
}

const PostMainnav = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [toggleStates, setToggleStates] = useState<{
		[postId: string]: boolean;
	}>({});

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					'https://backend.dahprofithive.com/api/v1/contents'
				);
				const fetchedPosts = response.data.data;
				setPosts(fetchedPosts);

				// Initialize toggle states based on the premium status of each post
				const initialToggleStates: { [postId: string]: boolean } = {};
				(fetchedPosts as Post[]).forEach((post: Post) => {
					initialToggleStates[post._id] = post.isPremium;
				});
				setToggleStates(initialToggleStates);
			} catch (error) {
				console.error('Error fetching posts:', error);
			}
		};

		fetchPosts();
	}, []);

	const handleTogglePremium = async (id: string) => {
		try {
			const authToken = Cookies.get('token');
			const config = {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			};

			// Determine the new premium status
			const currentPremiumStatus = toggleStates[id];
			const newPremiumStatus = !currentPremiumStatus;

			// Make a POST request to update the premium status
			const response = await axios.post(
				`https://backend.dahprofithive.com/api/v1/contents/${id}/make-premium`,
				{ isPremium: newPremiumStatus },
				config
			);

			// Update the state to reflect the updated post status
			setToggleStates((prevToggleStates) => ({
				...prevToggleStates,
				[id]: newPremiumStatus,
			}));

			// Update the isPremium field in the posts list
			setPosts((prevPosts) =>
				prevPosts.map((post) =>
					post._id === id ? { ...post, isPremium: newPremiumStatus } : post
				)
			);

			// Show a success toast notification
			toast.success('Premium status updated successfully');
		} catch (error) {
			console.error('Error updating premium status:', error);
			toast.error('Error updating premium status');
		}
	};

	const handleDeletePost = async (id: string) => {
		try {
			// Get the authorization token from wherever you store it (e.g., localStorage, cookies, etc.)
			const authToken = Cookies.get('token');
			console.log(authToken);

			// Include the authorization token in the request headers
			const config = {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			};

			// Make the delete request with the headers
			await axios.delete(
				`https://backend.dahprofithive.com/api/v1/contents/contents?id=${id}`,
				config
			);

			// Update the state to reflect the deleted post
			setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	return (
		<div className='w-full lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<AdminHeader />

			<div>
				<div className='mt-[3rem]'>
					<div>
						<div className='flex justify-between items-center'>
							<h1>All Posts</h1>
							<div className='bg-primary-blue py-2 px-4 text-white rounded-md'>
								<Link
									className='flex items-center gap-2'
									href={'/admin/createPosts'}>
									Create Post <AiOutlinePlus />
								</Link>
							</div>
						</div>
						<div>
							<div className='w-full flex item-center justify-center'>
								<div className='w-full overflow-x-auto no-scrollbar'>
									<table className='w-full text-md bg-white shadow-md rounded mb-4'>
										<tbody>
											<tr className='border-b'>
												<th className='text-left p-3 px-5'>Title</th>
												<th className='text-left p-3 px-5'>Category</th>
												<th className='text-left p-3 px-5'>Premium</th>
												<th></th>
											</tr>
											{posts.map((post) => (
												<tr
													key={post._id}
													className='border-b hover:bg-orange-100 bg-gray-100 text-sm'>
													<td className='p-3 px-5'>{post.title}</td>
													<td className='p-3 px-5'>{post.category}</td>
													<td className='p-3 px-5'>
														<div className='flex justify-start gap-4'>
															{/* {post.isPremium ? 'True' : 'False'} */}
															{toggleStates[post._id] ? 'Premium' : 'Regular'}
															<label className='relative inline-flex items-center cursor-pointer'>
																<input
																	type='checkbox'
																	value=''
																	className='sr-only peer'
																	checked={toggleStates[post._id]}
																	onChange={() => handleTogglePremium(post._id)}
																/>
																<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
															</label>
														</div>
													</td>
													<td className='p-3 px-5 flex justify-end'>
														<div className='flex justify-end gap-4'>
															{/* delete */}
															<Link
																href='#'
																onClick={() => handleDeletePost(post._id)}>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	fill='none'
																	viewBox='0 0 24 24'
																	strokeWidth='1.5'
																	stroke='currentColor'
																	className='h-6 w-6'
																	x-tooltip='tooltip'>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
																	/>
																</svg>
															</Link>
															{/* edit */}
															<Link href={`/admin/editPost?id=${post._id}`}>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	fill='none'
																	viewBox='0 0 24 24'
																	strokeWidth='1.5'
																	stroke='currentColor'
																	className='h-6 w-6'
																	x-tooltip='tooltip'>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
																	/>
																</svg>
															</Link>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<Toaster />
				</div>
			</div>
		</div>
	);
};

export default PostMainnav;
