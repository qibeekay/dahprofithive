'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface User {
	Id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	isAdmin: boolean;
	rewardAmount: string;
	withdrawalStatus: string;
}

interface Withdraw {
	amount: number;
}

const AccountDetails = () => {
	const [users, setUsers] = useState<User | null>(null);
	const [withdrawalDetails, setWithdrawalDetails] = useState<Withdraw[]>([]);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userId = Cookies.get('userId');
				const authToken = Cookies.get('token');

				const userResponse = await axios.get(
					`https://backend.dahprofithive.com/api/v1/users/${userId}`
				);
				setUsers(userResponse.data);

				const withdrawalResponse = await axios.get(
					`https://backend.dahprofithive.com/api/v1/transactionHistory`,
					{
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				setWithdrawalDetails(withdrawalResponse.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchUserData();
	}, []);

	if (users === null) {
		// Handle the case when user is still loading
		return <div>Loading...</div>;
	}

	// console.log(users);
	// console.log(withdrawalDetails);
	return (
		<div className='w-full '>
			<div>
				{/* account details */}
				<div>
					<div>
						<div className='flex items-center justify-between my-10'>
							<h1>Wallets</h1>
							<div>
								<Link
									href={'/account/request'}
									className=' bg-primary-blue text-white py-2 px-4 rounded-lg'>
									Withdraw
								</Link>
							</div>
						</div>

						<div className=''>
							<div className='flex flex-col lg:flex-row items-center justify-center w-full sm:w-[70%] lg:w-[50%] mx-auto gap-10'>
								{/* current balance */}
								<div
									key={users.Id}
									className='mt-4 w-full sm:border sm:rounded-xl sm:p-5'>
									<div className='flex flex-col sm:flex-row gap-x-4'>
										<p>Incomes</p>
										<div className='border rounded-xl p-4 w-full'>
											<div>
												{/* header */}
												<div className='flex justify-between'>
													<p>Balance:</p>
													<p>Earnings</p>
												</div>
												<div>
													<h1 className='text-2xl font-bold'>
														${users.rewardAmount}
													</h1>
												</div>

												<div className='mt-7'>
													{/* email */}
													<p>{users.email}</p>
													<div className='flex justify-between'>
														<p>
															{users.firstName} {users.lastName}
														</p>
														<p>VISA</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* total withdrawers */}
							</div>
						</div>
					</div>

					<div className='w-full'>
						{users ? (
							<div>
								{/* Display user information */}
								<h1>Wallets</h1>
								{/* ... Display user information here */}
								<h1>Transaction History</h1>
								<div className='flex flex-col gap-y-2'>
									{/* Iterate over withdrawalDetails and display each item */}
									{withdrawalDetails.map((withdrawal, index) => (
										<div
											key={index}
											className='flex items-center justify-between'>
											<p>Withdrawal</p>
											{/* <p>Date: {withdrawal.date}</p> */}
											<p>-${withdrawal.amount}</p>
											{/* <p>Bank Name: {withdrawal.bankName}</p> */}
											{/* Add more fields as needed */}
										</div>
									))}
								</div>
							</div>
						) : (
							<div>Loading...</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountDetails;
