'use client';
import { FaUsers } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

interface WithdrawalDetail {
	cryptoAddress: string;
	cryptoName: string;
	withdrawalType: string | null;
	user: string;
	userId: string;
	amount: string;
	accountNumber: string;
	bankName: string;
	withdrawalId: string;
}

interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	isAdmin: boolean;
	withdrawalStatus: string;
	withdrawalDetails: WithdrawalDetail[];
	// withdrawalDetails
}

interface Withdraw {
	_id: string;
	userId: {
		firstName: string;
		lastName: string;
	};
	amount: number;
	accountNumber: string;
	bankName: string;
	status: string;
	cryptoAddress: string;
}
const DashMainnav = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [totalWithdrawals, setTotalWithdrawals] = useState<number>(0);
	const [premiumUsersCount, setPremiumUsersCount] = useState<number>(0);

	const authToken = Cookies.get('token');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					'https://backend.dahprofithive.com/api/v1/users',
					{
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				setUsers(response.data);
				// Calculate the number of premium users
				const premiumUsersCount = response.data.filter(
					(user: { isPremium: any }) => user.isPremium
				).length;
				// Set the number of premium users
				setPremiumUsersCount(premiumUsersCount);

				// Calculate the total number of withdrawals
				const totalWithdrawalsCount = response.data.reduce(
					(total: number, user: User) => total + user.withdrawalDetails.length,
					0
				);
				// Set the total number of withdrawals
				setTotalWithdrawals(totalWithdrawalsCount);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	console.log(users);

	const [withdraws, setWithdraws] = useState<Withdraw[]>([]);

	useEffect(() => {
		const fetchWithdraws = async () => {
			try {
				const response = await axios.get(
					'https://backend.dahprofithive.com/api/v1/transactionHistory/all',
					{
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				setWithdraws(response.data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchWithdraws();
	}, []);

	// console.log(withdraws);

	const handleToggleChange = async (withdrawalId: string) => {
		try {
			const authToken = Cookies.get('token');

			const response = await axios.post(
				`https://backend.dahprofithive.com/api/v1/superAdmin/admin/approve-withdrawal`,
				{ withdrawalId },
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);

			toast.success('Withdrawal status updated successfully');
			// Update the local state to reflect the new status
			setWithdraws((prevWithdraws) =>
				prevWithdraws.map((withdraw) => {
					if (withdraw._id === withdrawalId) {
						// Update the status to "approved"
						return {
							...withdraw,
							status: 'approved',
						};
					}
					return withdraw;
				})
			);
			console.log(response.data);
			// You might want to update the local user and their withdrawal status here
		} catch (error: any) {
			console.error('Error updating withdrawal status:', error);
			console.log(error.response);
		}
	};

	return (
		<div className='w-full lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<AdminHeader />

			<div className='mt-[2rem]'>
				{/* counts and details */}
				<div className='flex items-center gap-4 flex-wrap'>
					{/* total users */}
					<div>
						<div className=' bg-white shadow w-fit py-4 px-6 border-l-4 border-l-primary-blue rounded-md'>
							{/* text */}
							<div className='flex items-center gap-[3rem]'>
								<h1>Total Users</h1>
								<div>
									<FaUsers size={30} />
								</div>
							</div>

							{/* count-numbers */}
							<div>
								<h1>{users.length}</h1>
							</div>
						</div>
					</div>

					{/* Subscribed users */}
					<div>
						<div className=' bg-white shadow w-fit py-4 px-6 border-l-4 border-l-primary-blue rounded-md'>
							{/* text */}
							<div className='flex items-center gap-[3rem]'>
								<h1>Premium Users</h1>
								<div>
									<FaUsers size={30} />
								</div>
							</div>

							{/* count-numbers */}
							<div>
								<h1>{premiumUsersCount}</h1>
							</div>
						</div>
					</div>

					{/* approved transactions */}
					<div>
						<div className=' bg-white shadow w-fit py-4 px-6 border-l-4 border-l-primary-blue rounded-md'>
							{/* text */}
							<div className='flex items-center gap-[3rem]'>
								<h1>Total Withdraw</h1>
								<div>
									<FaUsers size={30} />
								</div>
							</div>

							{/* count-numbers */}
							<div>
								<h1>{totalWithdrawals}</h1>
							</div>
						</div>
					</div>
				</div>

				{/* recent transactions */}
				<div className='mt-[2rem]'>
					<div>
						<h1>Recent Transactions</h1>
						<div>
							<div className='flex flex-col'>
								<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
									<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
										<div className='overflow-hidden'>
											<table className='w-full text-md bg-white shadow-md rounded mb-4'>
												<tbody>
													<tr className='border-b'>
														<th className='text-left p-3 px-5'>Name</th>
														<th className='text-left p-3 px-5'>Amount</th>
														<th className='text-left p-3 px-5'>Details</th>
														<th className='text-left p-3 px-5'>Bank</th>
														<th className='text-left p-3 px-5'>Wallet</th>
														<th className='text-left p-3 px-5'>Approved</th>
													</tr>
													{/* <tr className='border-b hover:bg-orange-100 bg-gray-100'> */}
													{withdraws.map((withdraw) => (
														<tr
															key={withdraw._id}
															className='border-b hover:bg-orange-100 bg-gray-100'>
															<td className='p-3 px-5'>
																{withdraw.userId
																	? `${withdraw.userId.firstName} ${withdraw.userId.lastName}`
																	: 'N/A'}
															</td>
															{/* <td className='p-3 px-5'>{user.email}</td> */}

															<td className='p-3 px-5'>${withdraw.amount}</td>
															<td className='p-3 px-5'>
																{withdraw.accountNumber}
															</td>
															<td className='p-3 px-5'>{withdraw.bankName}</td>
															<td className='p-3 px-5'>
																{withdraw.cryptoAddress}
															</td>
															<td className='p-3 px-5'>
																<div className='flex justify-center gap-4'>
																	<label className='relative inline-flex items-center cursor-pointer'>
																		<input
																			type='checkbox'
																			value=''
																			checked={withdraw.status === 'approved'}
																			onChange={() =>
																				handleToggleChange(withdraw._id)
																			}
																			className='sr-only peer'
																		/>
																		<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
																	</label>
																</div>
															</td>
														</tr>
													))}
													{/* </tr> */}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashMainnav;
