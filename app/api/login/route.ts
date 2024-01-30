import axios, { AxiosError } from 'axios';
import bcrypt from 'bcryptjs';
import { getAllUsers } from '../getUsers/route';
import Cookies from 'js-cookie';
interface LoginResponse {
	token: string;
	message: string;
	role: string;
	_id: string;
	// Add other properties if present in the actual response
}

export const loginUser = async (userData: {
	email: string;
	password: string;
}): Promise<{ _id: string; token: string }> => {
	try {
		const response = await axios.post<LoginResponse>(
			'https://backend.dahprofithive.com/api/v1/auth/login',
			userData
		);
		const { token, role } = response.data;
		Cookies.set('token', token);
		Cookies.set('role', role);
		// console.log(response.data);
		// console.log(role);

		const allUsers = await getAllUsers();
		const matchedUser = allUsers.find((user) => user.email === userData.email);

		if (matchedUser) {
			const isPasswordMatch = await bcrypt.compare(
				userData.password,
				matchedUser.password
			);

			if (isPasswordMatch) {
				console.log('Login successful');
				const _id = matchedUser._id;
				Cookies.set('userId', _id);
				return { token, _id };
			}
		}

		throw new Error('Invalid email or password');
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<LoginResponse>;
			// console.error('Login error:', axiosError.response?.data);
			throw new Error(axiosError.response?.data?.message || 'Error logging in');
		} else {
			console.error('Login error:', error);
			throw new Error('Invalid email or password');
		}
	}
};

// Function to get the authentication token from cookies
export const getAuthToken = () => {
	// Retrieve the token from cookies
	const token = Cookies.get('token');
	return token;
};

// api/login/route.ts

export const getUserName = async (): Promise<{
	firstName: string;
	lastName: string;
	email: string;
} | null> => {
	const userId = Cookies.get('userId');

	if (!userId) {
		return null; // Return null if user ID is not found in cookies
	}

	try {
		const apiUrl = `https://backend.dahprofithive.com/api/v1/users/${userId}`;
		const response = await axios.get(apiUrl);

		if (response.status === 200) {
			const user = response.data;

			// Update the structure of the returned object
			return {
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				email: user.email || '',
			};
		}
	} catch (error) {
		console.error('Error fetching user data:', error);
	}

	return null; // Return null if there was an error or the user was not found
};
