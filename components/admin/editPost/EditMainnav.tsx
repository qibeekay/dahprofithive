import { FormProps, MainHeader } from '@/components';
import AdminHeader from '@/components/admin/AdminHeader';

import React from 'react';

const EditMainnav = () => {
	return (
		<div className='w-full lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<AdminHeader />

			<div className=' w-[70%] mx-auto'>
				<h1 className='my-[2rem]'>Edit Post</h1>

				<div className=''></div>
			</div>
		</div>
	);
};

export default EditMainnav;
