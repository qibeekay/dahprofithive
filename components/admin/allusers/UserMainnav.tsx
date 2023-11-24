'use client';
import MainHeader from '@/components/MainHeader';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast, { ToastIcon, Toaster } from 'react-hot-toast';
import AdminHeader from '@/components/admin/AdminHeader';

interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	isAdmin: boolean;
	isPremium: boolean;
}

const UserMainnav = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					'https://backend.dahprofithive.com/api/v1/users'
				);
				setUsers(response.data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	const handleToggleChange = async (email: string) => {
		const userToUpdate = users.find((user) => user.email === email);
		if (userToUpdate) {
			try {
				const authToken = Cookies.get('token');
				const config = {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				};
				// Determine the new value for the isAdmin property based on the current toggle state
				const newIsAdminValue = !userToUpdate.isAdmin;
				// Make a POST request to update the toggle status on the server
				await axios.post(
					'https://backend.dahprofithive.com/api/v1/superAdmin/admin/make-admin',
					{
						email: email,
						toggle: newIsAdminValue,
					},
					config
				);

				// Update the users state with the updated user data
				const updatedUsers = users.map((user) => {
					if (user.email === email) {
						// Update the isAdmin property
						user.isAdmin = newIsAdminValue;
					}
					return user;
				});

				// Set the updated users data in the state
				setUsers(updatedUsers);
				toast.success('Admin Status Updated');
			} catch (error) {
				toast.error('Error updating Admin Status');
			}
		} else {
			// Handle the case where no user with the specified email was found
			toast.error(`User with email '${email}' not found.`);
		}
	};

	const makeUserPremium = async (email: string) => {
		const userToUpdate = users.find((user) => user.email === email);
		if (userToUpdate) {
			try {
				const authToken = Cookies.get('token');
				const config = {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				};
				// Determine the new value for the isAdmin property based on the current toggle state
				const newIsPremiumValue = !userToUpdate.isPremium;
				// Make a POST request to update the toggle status on the server
				await axios.post(
					'https://backend.dahprofithive.com/api/v1/superAdmin/admin/make-premium',
					{
						email: email,
						// toggle: newIsAdminValue,
					},
					config
				);

				// Update the users state with the updated user data
				const updatedUsers = users.map((user) => {
					if (user.email === email) {
						// Update the isAdmin property
						user.isPremium = newIsPremiumValue;
					}
					return user;
				});

				// Set the updated users data in the state
				setUsers(updatedUsers);
				toast.success('Premium Status Updated');
			} catch (error) {
				toast.error('Error updating Premium Status');
			}
		} else {
			// Handle the case where no user with the specified email was found
			toast.error(`User with email '${email}' not found.`);
		}
	};

	return (
		<div className='w-full lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<AdminHeader />

			<div>
				<div className='w-full flex item-center justify-center'>
					<div className='w-full overflow-x-auto no-scrollbar'>
						<table className='w-full text-md bg-white shadow-md rounded mb-4'>
							<tbody>
								<tr className='border-b'>
									<th className='text-left p-3 px-5'>Name</th>
									<th className='text-left p-3 px-5'>Email</th>
									<th className='text-left p-3 px-5'>Premium</th>
									<th className='text-left p-3 px-5'>Admin</th>
									<th></th>
								</tr>
								{users.map((user) => (
									<tr
										key={user._id}
										className='border-b hover:bg-orange-100 bg-gray-100 text-sm'>
										<td className='p-3 px-5'>
											{user.firstName} {user.lastName}
										</td>
										<td className='p-3 px-5'>{user.email}</td>
										<td className='p-3 px-5'>
											<div className='flex justify-center gap-4'>
												<label className='relative inline-flex items-center cursor-pointer'>
													<input
														type='checkbox'
														value=''
														className='sr-only peer'
														checked={user.isPremium}
														onChange={() => makeUserPremium(user.email)}
													/>
													<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
												</label>
											</div>
										</td>
										<td className='p-3 px-5'>
											<div className='flex justify-center gap-4'>
												<label className='relative inline-flex items-center cursor-pointer'>
													<input
														type='checkbox'
														value=''
														className='sr-only peer'
														checked={user.isAdmin}
														onChange={() => handleToggleChange(user.email)}
													/>
													<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
												</label>
											</div>
										</td>
										<td className='p-3 px-5'></td>
										<td className='p-3 px-5 flex justify-end'>
											<div className='flex justify-end gap-4'>
												{/* delete */}
												<Link href='#'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														strokeWidth='1.5'
														stroke='currentColor'
														className='h-6 w-6'
														x-tooltip='tooltip'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
														/>
													</svg>
												</Link>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<Toaster />
			</div>
		</div>
	);
};

export default UserMainnav;
