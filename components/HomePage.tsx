import React from 'react';
import { Sidenav, Mainnav } from '@/components';
import { ToggleProvider } from './SideNavContext';

const HomePage = () => {
	return (
		<div className='relative font-roboto'>
			<ToggleProvider>
				<Sidenav />
				<Mainnav />
			</ToggleProvider>
		</div>
	);
};

export default HomePage;
