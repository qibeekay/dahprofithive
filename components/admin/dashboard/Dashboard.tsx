import React from 'react';
import { DashMainnav, DashSidenav } from '@/components';

const Dashboard = () => {
	return (
		<div className='flex flex-col lg:flex-row relative font-roboto'>
			<DashSidenav />
			<DashMainnav />
		</div>
	);
};

export default Dashboard;
