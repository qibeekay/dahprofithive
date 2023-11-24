import React from 'react';
import { CreateMainnav, CreateSidenav } from '@/components';
const Form = () => {
	return (
		<div className='flex flex-col md:flex-row relative font-roboto'>
			<CreateSidenav />
			<CreateMainnav />
		</div>
	);
};

export default Form;
