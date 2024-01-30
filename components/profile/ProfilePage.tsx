'use client';
import { getUserName } from '@/app/api/login/route';
import { updateProfile } from '@/app/api/register/route';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEllipsisV } from 'react-icons/fa';

interface FormDataInterface {
	firstName: string;
	lastName: string;
	email: string;
	userImage?: File | string; // userImage can be either File or string
}

const ProfilePage = () => {
	const [userInfo, setUserInfo] = useState<{
		firstName: string;
		lastName: string;
		email: string;
	} | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [userImage, setUserImage] = useState<string | File>('');
	const [userImageUrl, setUserImageUrl] = useState<string | null>(null);

	useEffect(() => {
		// Retrieve the user's name
		getUserName()
			.then((name) => {
				setUserInfo(name);
				setFormData({
					firstName: name?.firstName || '',
					lastName: name?.lastName || '',
					email: name?.email || '',
				});
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error getting user name:', error);
				setIsLoading(false);
			});
	}, []);

	// useEffect to set user image URL from localStorage on client-side
	useEffect(() => {
		const storedImageUrl = localStorage.getItem('userImageUrl');
		if (storedImageUrl) {
			setUserImageUrl(storedImageUrl);
		}
	}, []);

	const [formData, setFormData] = useState<FormDataInterface>({
		firstName: '',
		lastName: '',
		email: '',
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = event.target;

		if (name === 'userImage') {
			if (files) {
				setUserImage(files[0]);
				setUserImageUrl(URL.createObjectURL(files[0]));
			} else {
				setUserImage('');
				setUserImageUrl(null);
			}
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value,
			}));
		}
	};
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);
			const response = await updateProfile({
				email: formData.email,
				firstName: formData.firstName,
				lastName: formData.lastName,
				userImage,
			});

			toast.success(response.message);

			// Fetch updated user information after the update
			getUserName().then((name) => {
				setUserInfo(name);

				// If a new image was uploaded, update the image source and store in local storage
				if (response.userImage && response.userImage.length > 0) {
					const newImageUrl = response.userImage[0].url;
					setUserImageUrl(newImageUrl);
					localStorage.setItem('userImageUrl', newImageUrl);
				}

				setIsLoading(false);
			});
		} catch (error: any) {
			toast.error(error.message);
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className='py-[2rem]'>
				{/* profile card */}
				<div className='sm:bg-primary-blue flex items-center pl-3 pr-1 py-1.5 gap-10 rounded-lg w-[13rem] mx-auto'>
					<Link href={''} className='flex items-center gap-2'>
						{/* image */}
						<div className='relative overflow-hidden w-[2rem] aspect-square rounded-full'>
							{isLoading ? (
								// Show loading indicator while fetching user info
								<div>Loading...</div>
							) : (
								// Display user info if available
								userInfo && (
									<img
										src={userImageUrl || '/profile.jpg'}
										className='w-full h-full block object-center'
										alt='profile'
									/>
								)
							)}
						</div>

						{/* text */}
						{isLoading ? (
							// Show loading indicator while fetching user info
							<div>Loading...</div>
						) : (
							// Display user info if available
							userInfo && (
								<div className='hidden sm:block text-xs text-white'>
									<p className='font-semibold'>
										{userInfo.firstName} {userInfo.lastName}
									</p>
									<p className='text-[.5rem] font-light'>{userInfo.email}</p>
								</div>
							)
						)}
					</Link>
				</div>

				{/* info */}
				<form className='flex flex-col md:flex-row py-10'>
					{/* profile */}
					<div className='w-[50%] flex flex-col items-center justify-center text-center'>
						<h1>Profile</h1>

						{/* image con */}
						<div className=' grid items-center justify-center'>
							<div className=' w-20 aspect-square overflow-hidden rounded-full'>
								<img
									src={userImageUrl || '/profile.jpg'}
									className='w-full h-full object-cover'
									alt=''
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-center w-full'>
								<label
									htmlFor='dropzone-file'
									className='flex flex-col items-center justify-center w-full bg-primary-blue rounded-lg cursor-pointer'>
									<div className='flex flex-col items-center justify-center py-0.5 px-6'>
										<p className='mb-2 text-sm '>
											<span className=' text-white font-light'>
												Upload new avatar
											</span>
										</p>
									</div>
									<input
										id='dropzone-file'
										type='file'
										name='userImage'
										onChange={handleChange}
										className='hidden'
									/>
								</label>
							</div>
						</div>
					</div>

					{/* profile update */}
					<div className='border-l-2 w-full px-[4rem]'>
						<div>
							<div className='grid gap-5'>
								<div className='flex justify-between items-center'>
									<h1>BASIC INFO</h1>

									<div className='flex items-center gap-3'>
										<Link
											href={'/'}
											className='border-2 border-primary-blue py-1.5 w-[5.5rem] rounded-lg grid items-center justify-center'>
											CANCEL
										</Link>
										<button
											className='border-2 border-primary-blue bg-primary-blue py-1.5 rounded-lg w-[5.5rem] text-white'
											onClick={handleSubmit}>
											SAVE
										</button>
									</div>
								</div>

								<hr className='w-full border ' />

								<div className='flex gap-4'>
									{/* firstname */}
									<div className='w-full'>
										<label htmlFor='' className='text-sm'>
											FIRST NAME
										</label>
										<input
											type='text'
											name='firstName'
											value={
												formData.firstName !== ''
													? formData.firstName
													: userInfo?.firstName || ''
											}
											onChange={handleChange}
											className='w-full mt-2 border-2 border-[#E5E5E5] rounded-md outline-none'
										/>
									</div>
									{/* lastname */}
									<div className='w-full'>
										<label htmlFor='' className='text-sm'>
											LAST NAME
										</label>
										<input
											type='text'
											name='lastName'
											value={
												formData.lastName !== ''
													? formData.lastName
													: userInfo?.lastName || ''
											}
											onChange={handleChange}
											className='w-full mt-2 border-2 border-[#E5E5E5] rounded-md outline-none'
										/>
									</div>
								</div>

								{/* email */}
								<div>
									<label htmlFor='' className='text-sm'>
										EMAIL
									</label>
									<input
										type='email'
										name='email'
										value={
											formData.email !== ''
												? formData.email
												: userInfo?.email || ''
										}
										onChange={handleChange}
										className='w-full mt-2 border-2 border-[#E5E5E5] rounded-md outline-none'
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
