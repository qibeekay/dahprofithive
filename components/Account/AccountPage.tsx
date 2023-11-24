import React from 'react';
import AccountMain from './AccountMain';
import AccountSide from './AccountSide';

const AccountPage = () => {
	return (
		<div className='flex flex-col lg:flex-row relative font-roboto'>
			<AccountSide />
			<AccountMain />
		</div>
	);
};

export default AccountPage;
