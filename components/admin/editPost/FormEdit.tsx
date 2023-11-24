import React from 'react';
import { EditMainnav, EditSidenav } from '@/components';
const FormEdit = () => {
	return (
		<div className='flex flex-col md:flex-row relative font-roboto'>
			<EditSidenav />
			<EditMainnav />
		</div>
	);
};

export default FormEdit;
