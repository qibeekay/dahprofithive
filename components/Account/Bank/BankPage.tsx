import Sidenav from '@/components/Sidenav';
import React from 'react';
import BankMain from './BankMain';

const BankPage = () => {
	return (
		<div className='flex flex-col lg:flex-row relative font-roboto'>
			<Sidenav />
			<BankMain />
		</div>
	);
};

export default BankPage;
