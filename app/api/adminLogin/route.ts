import axios from 'axios';
// import bcrypt from 'bcryptjs';
// import { getAllUsers } from '../getUsers/route';
import Cookies from 'js-cookie';
interface LoginResponse {
	token: string;
	message: string;
	role: string;
	_id: string;
	userName: string;
	email: string;
	// Add other properties if present in the actual response
}

const API_URL =
	'https://backend.dahprofithive.com/api/v1/superAdmin/admin/login';

export const adminLogin = async (userData: {
	userName: string;
	email: string;
	password: string;
}) => {
	try {
		const response = await axios.post<LoginResponse>(`${API_URL}`, userData);
		const { token, role, userName, email } = response.data;
		Cookies.set('token', token);
		Cookies.set('role', role);
		Cookies.set('sname', userName);
		Cookies.set('semail', email);

		// console.log(response.data);
		// console.log(role);
	} catch (error: any) {
		throw new Error(error.response.data.message);
	}
};

// Function to get the authentication token from cookies
export const getAuthToken = () => {
	// Retrieve the token from cookies
	const token = Cookies.get('token');
	return token;
};

// Function to get the authentication token from cookies
export const getDetails = () => {
	// Retrieve the token from cookies
	const email = Cookies.get('semail');
	const userName = Cookies.get('sname');
	return { email, userName };
};
