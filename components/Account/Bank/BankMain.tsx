'use client';
import React, { FormEvent, useState } from 'react';
import AccountHeader from '../AccountHeader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const BankMain = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [details, setDetails] = useState({
		withdrawalType: 'bank',
		accountNumber: '',
		bankName: '',
		amount: '',
	});

	const token = Cookies.get('token');
	const userId = Cookies.get('userId');

	const router = useRouter();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const response = await axios.post(
				`https://backend.dahprofithive.com/api/v1/withdraw/withdraw`,
				{
					withdrawalType: details.withdrawalType,
					accountNumber: details.accountNumber,
					bankName: details.bankName,
					amount: details.amount,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log('Request Submitted');
			console.log(response.data);
			router.push('/account');
			toast.success(response.data.message);
		} catch (error: any) {
			toast.error('Error Placing Withdrawal');
			console.log(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full md:w-[70%] lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<AccountHeader />

			<div>
				<Link href={'/account/request'}>Back</Link>
			</div>

			<div className='flex items-center justify-center'>
				<div className=' w-[55%]'>
					<h1 className='text-center'>Bank Transfer</h1>

					<div className='px-3 py-10 shadows bg-white rounded-lg'>
						<form action='' onSubmit={handleSubmit}>
							<div className=''>
								<input
									type='text'
									placeholder='Account Number'
									id='accountNumber'
									name='accountNumber'
									value={details.accountNumber}
									onChange={handleChange}
									className='w-full px-4 py-2 outline-none border-2 rounded-lg'
								/>
							</div>
							<div className='mt-4'>
								<input
									type='text'
									placeholder='Bank Name'
									id='bankName'
									name='bankName'
									value={details.bankName}
									onChange={handleChange}
									className='w-full px-4 py-2 outline-none border-2 rounded-lg'
								/>
							</div>
							<div className='mt-4'>
								<input
									type='number'
									placeholder='Amount'
									id='amount'
									name='amount'
									value={details.amount}
									onChange={handleChange}
									className='w-full px-4 py-2 outline-none border-2 rounded-lg'
								/>
							</div>

							<button className='w-full px-4 py-2 outline-none border-2 rounded-lg bg-blue-950 text-white mt-10'>
								{isLoading ? 'Loading...' : 'Withdraw'}
							</button>
						</form>
					</div>
				</div>
				<Toaster />
			</div>
		</div>
	);
};

export default BankMain;
