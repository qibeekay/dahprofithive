import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const isPublicPath =
		path === '/login' ||
		path === '/register' ||
		path === '/' ||
		path === '/adminRegister' ||
		path === '/adminLogin';
	const isAdminPath = path.startsWith('/admin/');
	const isAccountPath = path === '/account';
	const token = request.cookies.get('token')?.value;
	const role = request.cookies.get('role')?.value;

	if (!isPublicPath && isAdminPath && !token && request.method !== 'OPTIONS') {
		// Redirect to the Home page if the token is missing and the path is not public
		return NextResponse.redirect(new URL('/', request.nextUrl));
	}

	if (isAdminPath && (!token || role !== 'SuperAdmin')) {
		// Redirect to the home page if the user is not authenticated or not an admin
		return NextResponse.redirect(new URL('/', request.nextUrl));
	}

	if (isAccountPath && !token) {
		// Redirect to the Home page if the user is not authenticated and trying to access /account
		return NextResponse.redirect(new URL('/', request.nextUrl));
	}
}

export const config = {
	matcher: [
		'/',
		'/login',
		'/register',
		'/adminRegister',
		'/adminLogin',
		'/admin/:path*',
		'/account',
	],
};
