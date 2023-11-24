'use client';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import { FaEllipsisV } from 'react-icons/fa';
import Link from 'next/link';
import { logoutUser } from '@/app/api/logout/route';
import { useRouter } from 'next/navigation';
import { getAuthToken, getUserName } from '@/app/api/login/route';
import toast, { Toaster } from 'react-hot-toast';
import { useToggle } from '../SideNavContext';

const AccountHeader = () => {
	const router = useRouter();
	const [token, setToken] = useState<string | null>(null);
	const [userInfo, setUserInfo] = useState<{
		fullName: string;
		email: string;
	} | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { openToggleModal } = useToggle();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null as HTMLDivElement | null);

	// Handle logout button click event
	const handleLogoutClick = () => {
		logoutUser();
		toast.success('Logout Success');
		router.push('/login');
	};

	useEffect(() => {
		// Retrieve the token using getAuthToken on the client side
		const authToken = getAuthToken();
		setToken(authToken || null);
	}, []);

	useEffect(() => {
		// Retrieve the user's name
		getUserName()
			.then((name) => {
				setUserInfo(name);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error getting user name:', error);
				setIsLoading(false);
			});
	}, []);

	// Function to toggle the profile dropdown
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Function to close the dropdown when a click occurs outside of it
	const closeDropdown = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			event.target instanceof Node &&
			!dropdownRef.current.contains(event.target)
		) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		// Add a click event listener on the document
		document.addEventListener('click', closeDropdown);

		// Remove the click event listener when the component unmounts
		return () => {
			document.removeEventListener('click', closeDropdown);
		};
	}, []);

	return (
		<div className=''>
			<div className='flex justify-between items-center'>
				{/* hamburger */}
				<div className='md:hidden cursor-pointer' onClick={openToggleModal}>
					<HiOutlineMenuAlt2 size={20} />
				</div>

				{/* title */}
				<div className=' text-center font-bold text-[#0768B5] text-sm xs:text-lg sm:text-xl'>
					<h1>Account Statistics</h1>
				</div>

				{token ? (
					<div className='flex items-center gap-4'>
						<div className='sm:bg-primary-blue flex items-center pl-3 pr-1 py-1.5 gap-10 rounded-lg'>
							<Link href={''} className='flex items-center gap-2'>
								{/* image */}
								<div className='relative overflow-hidden w-[2rem] aspect-square rounded-full'>
									<img
										src='/profile.jpg'
										className='w-full h-full block object-center'
										alt='profile'
									/>
								</div>

								{/* text */}
								{isLoading ? (
									// Show loading indicator while fetching user info
									<div>Loading...</div>
								) : (
									// Display user info if available
									userInfo && (
										<div className='hidden sm:block text-xs text-white'>
											<p className='font-semibold'>{userInfo.fullName}</p>
											<p className='text-[.5rem] font-light'>
												{userInfo.email}
											</p>
										</div>
									)
								)}
							</Link>

							<div
								className='hidden sm:block text-white cursor-pointer'
								onClick={toggleDropdown}>
								<FaEllipsisV />
							</div>
						</div>
						<div className='relative'>
							{isDropdownOpen && (
								<div className='absolute top-8 -left-[10.5rem] bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md z-[999] py-2 w-[12rem]'>
									<ul>
										<li className='cursor-pointer px-4 pt-3 pb-1'>
											<Link href={'/profile'}>Profile</Link>
										</li>
										<li
											onClick={handleLogoutClick}
											className='cursor-pointer text-red-600 hover:text-red-400 px-4 pb-2'>
											Logout
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				) : (
					// If not authenticated, display login link or login form
					<div>
						<Link href='/login'>Login</Link>
					</div>
				)}
			</div>
			<Toaster />
		</div>
	);
};

export default AccountHeader;
