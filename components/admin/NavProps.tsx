'use client';
import Link from 'next/link';
import React from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FiBriefcase, FiHome } from 'react-icons/fi';
import { useToggle } from '../SideNavContext';
import { HiX } from 'react-icons/hi';
import { usePathname } from 'next/navigation';

const NavProps = () => {
	const { isDashToggleOpen, closeDashToggleModal } = useToggle();

	const pathname = usePathname();

	const isActive = (path: string) => {
		return path === pathname;
	};

	return (
		<div
			className={` w-[80%] lg:grid xs:w-[20rem] bg-[#F4F9F8] fixed lg:w-[22%]  h-screen z-[999] ${
				isDashToggleOpen ? 'grid' : 'hidden'
			}`}>
			<div className=''>
				{/* logo */}
				<div className='text-center mt-[1rem] font-bold text-[#0768B5] text-xl relative'>
					<Link href={'/'}>
						<h1>David News</h1>
					</Link>
					<div
						className='md:hidden absolute cursor-pointer left-2 top-[50%] -translate-y-[50%]'
						onClick={closeDashToggleModal}>
						<HiX />
					</div>
				</div>

				{/* links */}
				<div className='border-b mr-[1rem] mt-[2rem]'>
					<ul className='text-amber-blue'>
						<li
							className={`group hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4 ${
								isActive('/admin/adminDashboard') ? 'bg-primary-blue/10' : ''
							}`}>
							<Link
								href='/admin/adminDashboard'
								className={`flex items-center group-hover:text-primary-blue gap-2 ${
									isActive('/admin/adminDashboard') ? 'text-primary-blue' : ''
								}`}>
								<span
									className={` group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full ${
										isActive('/admin/adminDashboard')
											? 'bg-primary-blue'
											: 'bg-transparent'
									}`}></span>
								<FiHome size={25} className='mr-4' />
								Dashboard
							</Link>
						</li>
						<li
							className={`group hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4 ${
								isActive('/admin/adminUser') ? 'bg-primary-blue/10' : ''
							}`}>
							<Link
								href='/admin/adminUser'
								className={`flex items-center group-hover:text-primary-blue gap-2 ${
									isActive('/admin/adminUser') ? 'text-primary-blue' : ''
								}`}>
								<span
									className={` group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full ${
										isActive('/admin/adminUser')
											? 'bg-primary-blue'
											: 'bg-transparent'
									}`}></span>
								<BsFillPeopleFill size={25} className='mr-4' />
								Users
							</Link>
						</li>
						<li
							className={`group hover:bg-primary-blue/10 rounded-r-3xl py-2.5 pl-4 ${
								isActive('/admin/adminPost') ? 'bg-primary-blue/10' : ''
							}`}>
							<Link
								href='/admin/adminPost'
								className={`flex items-center group-hover:text-primary-blue gap-2 ${
									isActive('/admin/adminPost') ? 'text-primary-blue' : ''
								}`}>
								<span
									className={` group-hover:bg-primary-blue w-2 aspect-square mr-2 rounded-full ${
										isActive('/admin/adminPost')
											? 'bg-primary-blue'
											: 'bg-transparent'
									}`}></span>
								<FiBriefcase size={25} className='mr-4' />
								Posts
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default NavProps;
