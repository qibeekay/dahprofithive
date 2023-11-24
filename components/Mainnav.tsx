import React from 'react';
import { MainHeader, MainNavDetails, MainNavSide } from '@/components';

const Mainnav = () => {
	return (
		<div className='w-full md:w-[70%] lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<MainHeader />

			<div>
				<h1 className='font-bold text-2xl pt-[1.5rem]'>Top Stories for you</h1>
			</div>

			<div className='w-full flex'>
				<MainNavDetails />
				<MainNavSide />
			</div>
		</div>
	);
};

export default Mainnav;
