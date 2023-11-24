'use client';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { logoutUser } from '@/app/api/logout/route';
import { useRouter } from 'next/navigation';
import { getDetails, getAuthToken } from '@/app/api/adminLogin/route';
import toast, { Toaster } from 'react-hot-toast';
import { useToggle } from '../SideNavContext';

const MainHeader = () => {
	const router = useRouter();
	const [token, setToken] = useState<string | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const dropdownRef = useRef(null as HTMLDivElement | null);
	const { openDashToggleModal } = useToggle();

	// Handle logout button click event
	const handleLogoutClick = () => {
		logoutUser();
		toast.success('Logout Success');
		router.push('/adminLogin');
	};

	useEffect(() => {
		// Retrieve the token using getAuthToken on the client side
		const authToken = getAuthToken();
		setToken(authToken || null);

		// Retrieve the username and email using getDetails
		const { userName, email } = getDetails();
		setUserName(userName || '');
		setEmail(email || '');
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
		<div className='' ref={dropdownRef}>
			<div className='flex justify-between items-center'>
				{/* hamburger */}
				<div className='lg:hidden cursor-pointer' onClick={openDashToggleModal}>
					<HiOutlineMenuAlt2 size={20} />
				</div>

				{/* title */}
				<div className='md:hidden text-center font-bold text-[#0768B5] text-sm xs:text-lg sm:text-xl'>
					<h1>David News</h1>
				</div>

				{/* search */}
				<div className='flex items-center justify-between md:bg-primary-blue/5 py-2 px-5 md:w-[45%] overflow-hidden rounded-lg'>
					<input
						className='hidden md:block outline-none bg-transparent w-full'
						type='text'
						placeholder='Search for news...'
					/>
					<div className='cursor-pointer'>
						<FiSearch />
					</div>
				</div>

				{token ? (
					<div className=''>
						<div className=''>
							{/* image */}
							<div
								className='relative overflow-hidden w-[2.5rem] aspect-square rounded-full cursor-pointer'
								onClick={toggleDropdown}>
								<img
									src='/profile.jpg'
									className='w-full h-full block object-center'
									alt='profile'
								/>
							</div>
							{/* Conditionally render the profile dropdown content */}
							<div className='relative'>
								{isDropdownOpen && (
									<div className='absolute -left-[10.5rem] bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md z-[999] py-2 w-[12rem]'>
										<ul>
											<li className='font-semibold border-b p-2'>
												👋 Hey, {userName}
											</li>
											<li className='cursor-pointer px-4 pt-3 pb-1'>
												<Link href={''}>Profile</Link>
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

export default MainHeader;
