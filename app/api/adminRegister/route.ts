import axios, { AxiosError } from 'axios';
// interface LoginResponse {
// 	token: string;
// 	message: string;
// 	// Add other properties if present in the actual response
// }

const API_URL =
	'https://backend.dahprofithive.com/api/v1/superAdmin/admin/register';

export const adminRegister = async (userData: {
	userName: string;
	email: string;
	password: string;
}): Promise<void> => {
	try {
		const response = await axios.post(`${API_URL}`, userData);

		console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to register');
	}
};
