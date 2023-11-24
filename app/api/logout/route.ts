import Cookies from 'js-cookie';

export const logoutUser = () => {
	try {
		Cookies.remove('token'); // Remove the 'token' cookie
	} catch (error) {
		console.error('Logout error:', error);
		// Handle or log the error as needed
	}
};
