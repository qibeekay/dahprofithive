import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
	_id: string;
	email: string;
	password: string;
	// Add other properties if present in the actual response
}

const authToken = Cookies.get('token');

export const getAllUsers = async (): Promise<User[]> => {
	try {
		const response = await axios.get<User[]>(
			'https://backend.dahprofithive.com/api/v1/users',
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error retrieving users:', error);
		throw new Error('Error retrieving users');
	}
};
