import Sidenav from '@/components/Sidenav';
import React from 'react';
import CryptoMain from './CryptoMain';

const CryptoPage = () => {
	return (
		<div className='flex flex-col lg:flex-row relative font-roboto'>
			<Sidenav />
			<CryptoMain />
		</div>
	);
};

export default CryptoPage;
