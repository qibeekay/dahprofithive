'use client';
import { SinglePosts } from '@/components';
import { ModalProvider } from '@/components/ModalContext';
import ReplyModal from '@/components/ReplyModal';
import { ToggleProvider } from '@/components/SideNavContext';
import { useParams } from 'next/navigation';
// import { PostProvider } from '@/components/PostContext';

/**
 * MovieDetailsPage Component
 *
 * The MovieDetailsPage component represents a page in your application that displays
 * detailed information about a specific movie. It utilizes the `MovieDetails` component
 * to fetch and display movie details based on the provided movie ID.
 */

export default function PostDetailsPage() {
	// Extract the movie ID from the URL route parameters
	const { id } = useParams();
	return (
		<div>
			{/* <PostProvider> */}
			<ModalProvider>
				<ToggleProvider>
					<SinglePosts postId={id} />
				</ToggleProvider>
				<ReplyModal />
			</ModalProvider>
			{/* </PostProvider> */}
		</div>
	);
}
