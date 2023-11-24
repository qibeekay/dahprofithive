'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Posts {
	_id: string;
	title: string;
	body: string;
	createdAt: string; // Assuming the createdAt field is a string representing the date
	images: Image[];
	author: string;
	category: string[];
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
const MoreNews = () => {
	const [posts, setPosts] = useState<Posts[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get<ApiResponse>(
					'https://backend.dahprofithive.com/api/v1/contents'
				);
				setPosts(response.data.data);
				console.log(response.data.data);
			} catch (error) {
				console.error('Error fetching posts:', error);
			}
		};

		fetchPosts();
	}, []);
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

	const handlePostClick = (postId: string) => {
		router.push(`${postId}`);
	};

	function limitWords(text: string, wordLimit: number) {
		const words = text.split(' ');
		if (words.length <= wordLimit) {
			return text;
		}
		return words.slice(0, wordLimit).join(' ') + '...';
	}
	return (
		<div>
			<div className='grid grid-col-1 md:grid-cols-2 gap-4'>
				{posts.map((post) => (
					<div key={post._id} className='shadows p-4 rounded-lg'>
						<div
							className=' flex gap-2 cursor-pointer'
							onClick={() => handlePostClick(post._id)}>
							<div className='text-amber-blue w-full'>
								{/* text */}
								<div className=''>
									<h1 className='font-bold'>{post.title}</h1>
									<div
										className='text-sm line-clamp-3 my-2'
										dangerouslySetInnerHTML={{
											__html: limitWords(post.body, 13),
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
		</div>
	);
};

export default MoreNews;
