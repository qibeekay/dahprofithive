import Sidenav from '@/components/Sidenav';
import React from 'react';
import RequestMain from './RequestMain';

const RequestPage = () => {
	return (
		<div className='flex flex-col lg:flex-row relative font-roboto'>
			<Sidenav />
			<RequestMain />
		</div>
	);
};

export default RequestPage;
