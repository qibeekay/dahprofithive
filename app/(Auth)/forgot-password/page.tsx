'use client';
import { forgotPassword } from '@/app/api/register/route';
import { InputProps } from '@/components';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPassword() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showInitialForm, setShowInitialForm] = useState<boolean>(true);
	const [showNewForms, setShowNewForms] = useState<boolean>(false);
	const [resetToken, setResetToken] = useState('');

	const [formData, setFormData] = useState({
		email: '',
	});

	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		// Check if any field is empty
		for (const field in formData) {
			if (formData[field as keyof typeof formData] === '') {
				toast.error(`${field} cannot be empty`);
				return;
			}
		}

		try {
			setIsLoading(true);

			const response = await forgotPassword(formData);
			// Handle successful login
			// Set the state to show the new form
			setResetToken(response.resetToken);
			setShowInitialForm(false);
			setShowNewForms(true);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const [resetData, setResetData] = useState({
		password: '',
	});

	const handleResetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setResetData((prevResetData) => ({ ...prevResetData, [name]: value }));
	};

	const handleReset = async (e: FormEvent) => {
		e.preventDefault();

		for (const field in formData) {
			if (formData[field as keyof typeof formData] === '') {
				toast.error(`${field} cannot be empty`);
				return;
			}
		}

		try {
			setIsLoading(true);

			await axios.post(
				`https://backend.dahprofithive.com/api/v1/password/reset-password/${resetToken}`,
				resetData
			);
			toast.success('Password reset successfull');
			router.push('/login');
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<main>
			<div className='w-full min-h-screen bg-bgGreen py-20'>
				<div className='bg-white w-[70%] md:w-[50%] my-[5rem] lg:w-[50%] py-7 px-4 sm:p-7 rounded-3xl mx-auto text-dark'>
					{/* form-container */}
					<div>
						{/* header */}
						<div className='flex justify-between'>
							{/* logo */}
							<div className=' h-5 w-20 xs:h-6 xs:w-25 sm:w-28 cursor-pointer'></div>

							{/* text */}
							<div className='text-right'>
								<p className='text-greens text-sm sm:text-base font-semibold'>
									Forgot Password
								</p>
								<p className='text-dark/60 text-xs sm:text-base font-medium mt-1'>
									Access your account
								</p>
							</div>
						</div>

						{/* form */}
						<div>
							{/* Initial form */}
							{showInitialForm && (
								<form className='grid gap-7 relative' onSubmit={handleSubmit}>
									{/* email */}

									<InputProps
										type='email'
										id='email'
										name='email'
										value={formData.email}
										handleChange={handleChange}
										placeholder='Enter your email....'
									/>

									<div className='w-full xs:w-[70%] mx-auto mt-7'>
										<button className=' bg-primary-blue w-full py-2 px-5 rounded-lg text-white'>
											{isLoading ? 'Loading...' : 'Continue'}
										</button>
									</div>
								</form>
							)}

							{/* New forms */}
							{showNewForms && (
								<div>
									{/* Form 1 */}
									<form action='' onSubmit={handleReset}>
										<div className='w-full xs:w-[70%] mx-auto mt-7'>
											<InputProps
												type='password'
												id='password'
												name='password'
												value={resetData.password}
												handleChange={handleResetChange}
												placeholder='Enter new Password....'
											/>
											<button
												className=' bg-primary-blue w-full py-2 px-5 rounded-lg text-white'
												disabled={isLoading}>
												{isLoading ? 'Loading...' : 'Update'}
											</button>
										</div>
									</form>
								</div>
							)}
						</div>
					</div>
				</div>
				<Toaster />
			</div>
		</main>
	);
}
