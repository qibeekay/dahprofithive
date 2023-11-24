import React from 'react';
import MainHeader from './MainHeader';
import MainNavSide from './MainNavSide';
import MainPostDetails from './MainPostDetails';
import { PostDetails } from './SinglePosts';

interface MainPostProps {
	postdetails: PostDetails | null;
}

const MainPost = ({ postdetails }: MainPostProps) => {
	return (
		<div className='w-full md:w-[70%] lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<MainHeader />
			<div className='flex flex-col mt-[2rem]'>
				{postdetails && (
					<MainPostDetails
						title={postdetails.title}
						author={postdetails.author}
						body={postdetails.body}
						images={postdetails.images}
						postId={postdetails._id}
						category={[postdetails.category[0]]}
					/>
				)}
				<MainNavSide />
			</div>
		</div>
	);
};

export default MainPost;
