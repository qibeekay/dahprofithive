import axios, { AxiosError } from 'axios';

const API_URL = 'https://backend.dahprofithive.com/api/v1/users/register';

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
