import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://backend.dahprofithive.com/api/v1/users/register';
const API_URL1 =
	'https://backend.dahprofithive.com/api/v1/password/forgot-password';
const API_URL2 =
	'https://backend.dahprofithive.com/api/v1/users/update-profile';

export const registerUser = async (userData: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	cPassword: string;
}): Promise<void> => {
	try {
		const response = await axios.post(`${API_URL}`, userData);

		// console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to register');
	}
};

const token = Cookies.get('token'); // Retrieve the token from cookies

// update profile

export const updateProfile = async (userData: {
	email: string;
	firstName: string;
	lastName: string;
	userImage: File | string; // userImage can be either File or string
}): Promise<{
	message: string;
	userImage: Array<{ url: string; cld_id: string; _id: string }>;
}> => {
	try {
		const formData = new FormData();
		formData.append('email', userData.email);
		formData.append('firstName', userData.firstName);
		formData.append('lastName', userData.lastName);

		if (userData.userImage instanceof File) {
			// If it's a File (new image), append it to formData
			formData.append('userImage', userData.userImage);
		}

		const response = await axios.put(`${API_URL2}`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Handle the response as needed
		console.log('Update successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || 'Failed to update profile'
		);
	}
};

export const forgotPassword = async (userData: {
	email: string;
}): Promise<{ resetToken: string }> => {
	try {
		const response = await axios.post(`${API_URL1}`, userData);

		// console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to register');
	}
};
