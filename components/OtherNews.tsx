'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

interface Posts {
	_id: string;
	title: string;
	body: string;
	createdAt: string; // Assuming the createdAt field is a string representing the date
	images: Image[];
	author: string;
}

interface ApiResponse {
	success: boolean;
	data: Posts[]; // Specify the structure of the data property
}

interface Image {
	cld_id: string;
	url: string;
	_id: string;
}

const OtherNews = () => {
	const [posts, setPosts] = useState<Posts[]>([]);
	const [visiblePosts, setVisiblePosts] = useState<Posts[]>([]); // State to track the visible posts
	const [showMore, setShowMore] = useState(false);
	const [currentPostId, setCurrentPostId] = useState('');
	const router = useRouter();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get<ApiResponse>(
					'https://backend.dahprofithive.com/api/v1/contents'
				);
				setPosts(response.data.data);
			} catch (error) {
				console.error('Error fetching posts:', error);
			}
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		// Update the visible posts when the "posts" state changes
		setVisiblePosts(posts.slice(0, showMore ? posts.length : 10));
	}, [posts, showMore]);

	// ... (getTimeAgo and handlePostClick functions)

	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	// Helper function to convert createdAt to "time ago" format
	const getTimeAgo = (createdAt: string): string => {
		const currentTime = new Date();
		const createdAtDate = new Date(createdAt);
		const differenceInSeconds = Math.floor(
			(currentTime.getTime() - createdAtDate.getTime()) / 1000
		);

		if (differenceInSeconds < 60) {
			return `${differenceInSeconds} seconds ago`;
		} else if (differenceInSeconds < 3600) {
			return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
		} else if (differenceInSeconds < 86400) {
			return `${Math.floor(differenceInSeconds / 3600)} hour ago`;
		} else {
			return `${Math.floor(differenceInSeconds / 86400)} days ago`;
		}
	};

	// const handlePostClick = (postId: string) => {
	// 	router.push(`api/v1/contents/contents/${postId}`);
	// };

	const handlePostClick = async (postId: string) => {
		try {
			// Retrieve the userId from cookies
			const userId = Cookies.get('userId');
			const authToken = Cookies.get('token');

			// if (!userId) {
			// 	// Handle the case where userId is not found in cookies
			// 	console.error('User ID not found in cookies');
			// 	return;
			// }

			// Send a request to monitor the post click
			const response = await axios.post(
				`https://backend.dahprofithive.com/api/v1/users/content/`,
				{
					contentId: postId, // Pass the clicked post ID as contentId
					// userId: userId, // Use the retrieved userId from cookies
				},
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);

			console.log(response.data);
			console.log('Post clicked:', postId);
			setCurrentPostId(postId);
		} catch (error) {
			console.error('Error monitoring post click:', error);
		}

		// Navigate to the post details page
		router.push(`api/v1/contents/contents/${postId}`);
	};

	function limitWords(text: string, wordLimit: number) {
		const words = text.split(' ');
		if (words.length <= wordLimit) {
			return text;
		}
		return words.slice(0, wordLimit).join(' ') + '...';
	}

	return (
		<div className='my-5'>
			<div>
				{/* grid */}
				<div className='grid grid-col-1 md:grid-cols-2 gap-4'>
					{visiblePosts.map((post) => (
						<div key={post._id} className='shadows p-4 rounded-lg'>
							<div
								className=' flex gap-2 cursor-pointer'
								onClick={() => handlePostClick(post._id)}>
								<div className='text-amber-blue w-full'>
									{/* text */}
									<div className=''>
										<h1 className='font-bold'>{post.title}</h1>
										<div
											className='text-sm line-clamp-3 my-2 '
											dangerouslySetInnerHTML={{
												__html: limitWords(post.body, 9),
											}}
										/>
									</div>
								</div>

								{/* image */}
								{post.images.map((image) => (
									<div
										key={image._id}
										className='hidden xs:grid relative w-[70%] lg:w-[55%] h-[6rem] overflow-hidden rounded-lg'>
										<div className='h-full bg-red-400 w-full'>
											<img
												src={image.url}
												onError={(e) => {
													// Handle image loading errors
													e.currentTarget.src = '/fallback.jpg'; // Provide a fallback image URL
												}}
												alt='news'
												className='w-full h-full object-cover'
											/>
										</div>
									</div>
								))}
							</div>
							<div>
								<div className='flex text-sm items-center gap-5'>
									<p>{post.author}</p>
									<p>{getTimeAgo(post.createdAt)}</p>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='grid items-center justify-center mt-10'>
					<div
						onClick={handleShowMore}
						className='border border-[#072D4B] text-[#072D4B] py-1.5 px-6 w-fit rounded cursor-pointer'>
						{showMore ? 'Show Less' : 'Show More'}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OtherNews;
