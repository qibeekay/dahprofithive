import React from 'react';
import { FormProp } from '@/types';

const FormProps = ({
	name,
	id,
	placeholder,
	value,
	type,
	handleChange,
	accept,
}: FormProp) => {
	return (
		<div>
			<input
				type={type}
				value={value}
				id={id}
				name={name}
				placeholder={placeholder}
				onChange={handleChange}
				accept={accept}
				className='border border-primary-blue outline-none placeholder:text-amber-blue p-2.5 w-full'
			/>
		</div>
	);
};

export default FormProps;
