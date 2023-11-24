'use client';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import InputProps from './InputProps';
import Link from 'next/link';
import { registerUser } from '@/app/api/register/route';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		cPassword: '',
		role: 'Regular',
	});

	const router = useRouter();

	const handleChange = (event: any) => {
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

		// // Validate password length
		// if (formData.password.length < 6) {
		// 	setErrorMessage('Password must be at least 6 characters long');
		// 	return;
		// }
		try {
			setIsLoading(true);
			await registerUser(formData);
			toast.success('Registration Successfull');
			router.push('/login');
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className=' font-poppins'>
			<div className='flex flex-col md:flex-row min-h-screen md:bg-primary-blue'>
				{/* sidenav */}
				<div className='hidden md:block w-[45%] lg:w-[40%] bg-primary-blue text-white relative px-8 mt-[5rem] text-xl'>
					<div>
						<p>News around the world , any day, anytime, anywhere</p>

						{/* image */}
						<div className='absolute bottom-4 -right-[7rem]'>
							<Image
								src='/form.png'
								width={400}
								height={400}
								priority
								alt='image'
							/>
						</div>
					</div>
				</div>

				{/* form */}
				<div className='bg-white w-full md:rounded-l-3xl'>
					<div className='w-[70%] md:w-[50%] my-[5rem] mx-auto'>
						{/* text */}
						<div>
							<h1 className='font-semibold text-2xl'>Create Account</h1>

							{/* google */}
							<div className='flex items-center gap-3 border border-[#EAEAEA] rounded-lg w-fit px-2.5 py-2 cursor-pointer mt-[1rem]'>
								{/* image */}
								<div className='relative'>
									<Image
										src='/google.png'
										width={20}
										height={20}
										className='object-contain'
										alt='google'
									/>
								</div>
								{/* p */}
								<p className='text-xs font-medium'>Sign up with Google</p>
							</div>
						</div>

						<div className='py-[2rem] text-center text-[#909090]'>
							<p>- OR -</p>
						</div>

						{/* forn input */}
						<form className='flex flex-col' onSubmit={handleSubmit}>
							<InputProps
								type='text'
								id='firstName'
								name='firstName'
								value={formData.firstName}
								handleChange={handleChange}
								placeholder='First Name'
							/>
							<InputProps
								type='text'
								id='lastName'
								name='lastName'
								value={formData.lastName}
								handleChange={handleChange}
								placeholder='Last Name'
							/>
							<InputProps
								type='email'
								id='email'
								name='email'
								handleChange={handleChange}
								value={formData.email}
								placeholder='Email'
							/>
							<InputProps
								type='password'
								id='password'
								name='password'
								value={formData.password}
								handleChange={handleChange}
								placeholder='Password'
							/>
							<InputProps
								type='password'
								id='cPassword'
								name='cPassword'
								value={formData.cPassword}
								handleChange={handleChange}
								placeholder='Confirm Password'
							/>

							<button
								type='submit'
								className='bg-primary-blue py-2 rounded-lg text-white'>
								{isLoading ? 'Loading...' : 'Create Account'}
							</button>
						</form>

						{/* login */}
						<div className='mt-[1rem]'>
							<p className='text-[#A0A0A0]'>
								Already have an account?{' '}
								<Link className='text-[#7CD2D7]' href={'/login'}>
									Log in
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default RegisterForm;
