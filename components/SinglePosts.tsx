'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidenav from './Sidenav';
import MainPost from './MainPost';

export interface PostDetails {
	title: string;
	author: string;
	body: string;
	images: Image[];
	_id: string;
	category: string[];
}

export interface Image {
	cld_id: string;
	url: string;
	_id: string;
}

interface PostDetailsProps {
	postId: string | string[] | undefined;
}

const SinglePosts = ({ postId }: PostDetailsProps) => {
	const [postdetails, setPostDetails] = useState<PostDetails | null>(null);
	useEffect(() => {
		if (postId) {
			// fetch post details using post id
			axios
				.get(
					`https://backend.dahprofithive.com/api/v1/contents/contents/${postId}`
				)
				.then((response: any) => {
					// Check if response.data contains the expected properties
					if (response.data) {
						const { title, author, body, images, _id, category } =
							response.data;
						setPostDetails({
							title,
							author,
							body,
							images,
							_id,
							category,
						});
					} else {
						console.error('Invalid API response:', response.data);
					}
				})
				.catch((error: any) => {
					console.error(error);
				});
		}
	}, [postId]);

	return (
		<div>
			{postdetails ? (
				<div className='flex flex-col md:flex-row relative font-roboto'>
					<Sidenav />
					<MainPost postdetails={postdetails} />
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default SinglePosts;

{
	/* <h1>{postdetails.title}</h1>
					<p>Author: {postdetails.author}</p>
					<p>{postdetails.body}</p> */
}
