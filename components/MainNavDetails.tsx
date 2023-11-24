import React from 'react';
import { categories } from '@/constants';
import { OtherNews, HeaderNews } from '@/components';
const MainNavDetails = () => {
	// <div className='overflow-x-auto whitespace-nowrap no-scrollbar py-3'>
	// 	{/* btn */}
	// 	{categories.map((category) => (
	// 		<div
	// 			key={category}
	// 			className=' inline-block bg-white hover:bg-primary-blue w-fit px-5 py-0.5 mr-3 rounded-full shadow hover:text-white'>
	// 			<p className='cursor-pointer'>{category}</p>
	// 		</div>
	// 	))}
	// </div>
	return (
		<div className='w-full lg:w-[67%]'>
			<div>
				{/* btns */}

				{/* Header News */}
				<HeaderNews />
				{/* Other News */}
				<OtherNews />
			</div>
		</div>
	);
};

export default MainNavDetails;
