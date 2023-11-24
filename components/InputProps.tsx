import React from 'react';
import { InputProp } from '@/types';

const InputProps = ({
	type,
	name,
	id,
	placeholder,
	value,
	handleChange,
}: InputProp) => {
	return (
		<input
			type={type}
			value={value}
			id={id}
			name={name}
			placeholder={placeholder}
			onChange={handleChange}
			className='border-b border-b-[#EAEAEA] outline-none mb-[2rem] placeholder:text-[#A0A0A0]'
		/>
	);
};

export default InputProps;
