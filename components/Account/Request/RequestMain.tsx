'use client';
import React from 'react';
import AccountHeader from '../AccountHeader';
import Link from 'next/link';
import { BsCashStack } from 'react-icons/bs';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

const RequestMain = () => {
	const router = useRouter();
	const handleBank = () => {
		router.push('/account/bank');
	};
	const handleCrypto = () => {
		router.push('/account/crypto');
	};
	return (
		<div className='w-full md:w-[70%] lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<AccountHeader />

			<div>
				<Link href={'/account'}>Back</Link>
			</div>

			<div className='flex items-center justify-center'>
				<div className=' w-[55%]'>
					<h1 className='text-center'>Withdraw Earnings</h1>

					<div className='px-3 py-10 shadows bg-white rounded-lg'>
						<div
							className='flex items-center gap-5 shadows bg-white p-4 cursor-pointer rounded-lg'
							onClick={handleBank}>
							<div className='shadows bg-white p-2.5 rounded-full'>
								<BsCashStack size={20} />
							</div>
							<div>Bank Transfer</div>
						</div>
						<div
							className='flex items-center gap-5 shadows bg-white p-4 mt-4 cursor-pointer rounded-lg'
							onClick={handleCrypto}>
							<div className='shadows bg-white p-2.5 rounded-full'>
								<BsCurrencyBitcoin size={20} />
							</div>
							<div>Crypto (USDT)</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RequestMain;
