'use client';
import React from 'react';
import { FiHome, FiBriefcase, FiGift } from 'react-icons/fi';
import { FaRegAddressCard } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import Link from 'next/link';
import { useToggle } from './SideNavContext';
import { usePathname } from 'next/navigation';
import { HiX } from 'react-icons/hi';

const Sidenav = () => {
	const { isToggleOpen, closeToggleModal, openToggleModal } = useToggle();
	// You can use a media query to determine if it's a mobile screen

	const pathname = usePathname();

	const isActive = (path: string) => {
		return path === pathname;
	};
	return (
		<div>
			<div
				className={`hidden md:block fixed w-[30%] lg:w-[22%] bg-[#F4F9F8] h-screen`}>
				<div className=''>
					{/* logo */}
					<div className='text-center mt-[1rem] font-bold text-[#0768B5] text-xl'>
						<h1>David News</h1>
					</div>

					{/* links */}
					<div className=' border-b mr-[1rem] mt-[2rem]'>
						<ul className='text-amber-blue'>
							<li
								className={`group hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4 ${
									isActive('/') ? 'bg-primary-blue/10' : ''
								}`}>
								<Link
									href={'/'}
									className={`flex items-center group-hover:text-primary-blue gap-2 ${
										isActive('/') ? 'text-primary-blue' : ''
									}`}>
									<span
										className={` group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full ${
											isActive('/') ? 'bg-primary-blue' : 'bg-transparent'
										}`}></span>
									<FiHome size={25} className='mr-4' />
									Top Stories
								</Link>
							</li>

							<li className='group hover:text-primary-blue hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4'>
								<Link href={'/'} className='flex items-center gap-2'>
									<span className='bg-transparent group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full'></span>
									<BsFillPeopleFill size={25} className='mr-4' />
									About us
								</Link>
							</li>
							<li className='group hover:text-primary-blue hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4'>
								<Link href={'/'} className='flex items-center gap-2'>
									<span className='bg-transparent group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full'></span>
									<FiBriefcase size={25} className='mr-4' />
									Advertise with us
								</Link>
							</li>
							<li className='group hover:text-primary-blue hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4'>
								<Link href={'/'} className='flex items-center gap-2'>
									<span className='bg-transparent group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full'></span>
									<FaRegAddressCard size={25} className='mr-4' />
									Contact us
								</Link>
							</li>

							<li
								className={`group hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4 ${
									isActive('/account') ? 'bg-primary-blue/10' : ''
								}`}>
								<Link
									href={'/account'}
									className={`flex items-center group-hover:text-primary-blue gap-2 ${
										isActive('/account') ? 'text-primary-blue' : ''
									}`}>
									<span
										className={` group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full ${
											isActive('/account')
												? 'bg-primary-blue'
												: 'bg-transparent'
										}`}></span>
									<FiHome size={25} className='mr-4' />
									Account
								</Link>
							</li>
						</ul>
					</div>

					{/* card */}
					<div className='border-t mt-[4rem] mr-4 py-4 pl-4'>
						<div className='bg-primary-blue text-white p-4 lg:w-fit rounded'>
							<div className='flex items-center justify-between lg:gap-8'>
								<FiGift size={20} />
								<p className='text-sm'>Subscribe to Premium</p>
							</div>

							<div className='mt-3 flex items-center justify-between'>
								<h1 className='font-semibold text-xl'>
									$8<small>/m</small>
								</h1>

								<Link className='bg-[#0768B5] px-5 py-1 rounded-md' href={'/'}>
									Upgrade
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* mobile */}
			<div className={isToggleOpen ? 'md:hiddden' : ''}>
				<div
					className={
						isToggleOpen
							? 'fixed w-[55%] bg-[#F4F9F8] h-screen ease-in duration-700 left-0 z-[99999]'
							: 'fixed w-[55%] bg-[#F4F9F8] h-screen ease-out duration-700 left-[-100%] z-[99999]'
					}>
					{/* logo */}
					<div className='text-center mt-[1rem] font-bold text-[#0768B5] text-xl flex items-center justify-between p-4'>
						<h1>David News</h1>
						<p onClick={closeToggleModal} className='cursor-pointer'>
							<HiX />
						</p>
					</div>

					{/* links */}
					<div className=' border-b mr-[1rem] mt-[2rem]'>
						<ul className='text-amber-blue'>
							<li
								className={`group hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4 ${
									isActive('/') ? 'bg-primary-blue/10' : ''
								}`}>
								<Link
									href={'/'}
									className={`flex items-center group-hover:text-primary-blue gap-2 ${
										isActive('/') ? 'text-primary-blue' : ''
									}`}>
									<span
										className={` group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full ${
											isActive('/') ? 'bg-primary-blue' : 'bg-transparent'
										}`}></span>
									<FiHome size={25} className='mr-4' />
									Top Stories
								</Link>
							</li>
							<li className='group hover:text-primary-blue hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4'>
								<Link href={'/'} className='flex items-center gap-2'>
									<span className='bg-transparent group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full'></span>
									<BsFillPeopleFill size={25} className='mr-4' />
									About us
								</Link>
							</li>
							<li className='group hover:text-primary-blue hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4'>
								<Link href={'/'} className='flex items-center gap-2'>
									<span className='bg-transparent group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full'></span>
									<FiBriefcase size={25} className='mr-4' />
									Advertise with us
								</Link>
							</li>
							<li className='group hover:text-primary-blue hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4'>
								<Link href={'/'} className='flex items-center gap-2'>
									<span className='bg-transparent group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full'></span>
									<FaRegAddressCard size={25} className='mr-4' />
									Contact us
								</Link>
							</li>

							<li
								className={`group hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4 ${
									isActive('/account') ? 'bg-primary-blue/10' : ''
								}`}>
								<Link
									href={'/account'}
									className={`flex items-center group-hover:text-primary-blue gap-2 ${
										isActive('/account') ? 'text-primary-blue' : ''
									}`}>
									<span
										className={` group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full ${
											isActive('/account')
												? 'bg-primary-blue'
												: 'bg-transparent'
										}`}></span>
									<FiHome size={25} className='mr-4' />
									Account
								</Link>
							</li>
						</ul>
					</div>

					{/* card */}
					<div className='border-t mt-[4rem] mr-4 py-4 pl-4'>
						<div className='bg-primary-blue text-white p-4 lg:w-fit rounded'>
							<div className='flex items-center justify-between lg:gap-8'>
								<FiGift size={20} />
								<p className='text-sm'>Subscribe to Premium</p>
							</div>

							<div className='mt-3 flex items-center justify-between'>
								<h1 className='font-semibold text-xl'>
									$8<small>/m</small>
								</h1>

								<Link className='bg-[#0768B5] px-5 py-1 rounded-md' href={'/'}>
									Upgrade
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidenav;
