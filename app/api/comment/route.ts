import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://backend.dahprofithive.com/api/v1/contents/contents';
// const API_URL2 = 'https://backend.dahprofithive.com/api/v1/comments';
export const createComments = async (commentData: {
	comment: string;
	postId: string;
}): Promise<void> => {
	try {
		const token = Cookies.get('token');
		const response = await axios.post(
			`${API_URL}/${commentData.postId}/comments`,
			{
				comment: commentData.comment,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log('Comment Successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'failed to register');
	}
};

export const createReply = async (replyData: {
	replyBody: string;
	commentId: string;
	postId: string;
}): Promise<void> => {
	try {
		const token = Cookies.get('token');
		const response = await axios.post(
			`${API_URL}/${replyData.postId}/comments/${replyData.commentId}/replies`,
			{
				replyBody: replyData.replyBody,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		// console.log('Reply Successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'failed to register');
	}
};
