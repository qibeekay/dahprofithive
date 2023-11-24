'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

const HeaderNews = () => {
	const [latestPost, setLatestPost] = useState<Posts | null>(null);
	const router = useRouter();

	useEffect(() => {
		// Function to fetch the latest posts from the API
		const fetchLatestPosts = async () => {
			try {
				const response = await axios.get<ApiResponse>(
					'https://backend.dahprofithive.com/api/v1/contents'
				);
				const latestPostsData = response.data.data;

				// Sort posts by createdAt in descending order to get the latest one
				latestPostsData.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);

				// Set the latest post to the first post in the sorted array
				setLatestPost(latestPostsData[0]);
			} catch (error) {
				console.error('Error fetching latest posts:', error);
			}
		};

		fetchLatestPosts();

		// Set up an interval to refetch the latest posts every 5 minutes (adjust as needed)
		const intervalId = setInterval(fetchLatestPosts, 5 * 60 * 1000);

		return () => {
			clearInterval(intervalId); // Clean up the interval on component unmount
		};
	}, []);

	if (!latestPost) {
		// If no latest post is available yet (data is being fetched), you can show a loading state or return null
		return <div>Loading...</div>;
	}

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

	const imageUrl = latestPost && latestPost.images && latestPost.images[0]?.url;

	const handlePostClick = (postId: string) => {
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
		<div
			className='mt-3 cursor-pointer'
			onClick={() => handlePostClick(latestPost._id)}>
			{latestPost && (
				<div className='shadows p-4 rounded-lg flex gap-2'>
					<div className='text-amber-blue w-full'>
						{/* text */}
						<div className='w-full'>
							<h1 className='font-bold'>{latestPost.title}</h1>
							<div
								className='text-[#072D4B]/70'
								dangerouslySetInnerHTML={{
									__html: limitWords(latestPost.body, 13),
								}}
							/>
						</div>
						<div>
							<div className='flex text-sm items-center gap-5'>
								<p>{latestPost.author}</p>
								<p>{getTimeAgo(latestPost.createdAt)}</p>
							</div>
						</div>
					</div>

					{/* image */}
					<div className='relative md:w-[70%] lg:w-[40%] h-full overflow-hidden rounded-lg'>
						<div className='h-[7rem] bg-red-400 w-full'>
							<img
								src={imageUrl}
								onError={(e) => {
									// Handle image loading errors
									e.currentTarget.src = '/fallback.jpg'; // Provide a fallback image URL
								}}
								alt='news'
								className='w-full h-full object-cover'
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HeaderNews;
