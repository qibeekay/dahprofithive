import React from 'react';
import AccountHeader from './AccountHeader';
import AccountDetails from './AccountDetails';
import AccountNews from './AccountNews';

const AccountMain = () => {
	return (
		<div className='w-full md:w-[70%] lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<AccountHeader />

			<div className=''>
				<AccountDetails />
				{/* <AccountNews /> */}
			</div>
		</div>
	);
};

export default AccountMain;
