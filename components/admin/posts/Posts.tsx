import React from 'react';
import { PostMainnav, PostSidenav } from '@/components';

const Posts = () => {
	return (
		<div className='flex flex-col lg:flex-row relative font-roboto'>
			<PostSidenav />
			<PostMainnav />
		</div>
	);
};

export default Posts;
