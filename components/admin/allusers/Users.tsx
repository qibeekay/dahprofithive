import React from 'react';
import { UserMainnav, UserSidnnav } from '@/components';

const Users = () => {
	return (
		<div className='flex flex-col lg:flex-row relative font-roboto'>
			<UserSidnnav />
			<UserMainnav />
		</div>
	);
};

export default Users;
