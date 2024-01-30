'use client';
// import { Form } from '@/components';
import { ToggleProvider } from '@/components/SideNavContext';
import dynamic from 'next/dynamic';
const FormEdit = dynamic(
	() => {
		return import('@/components/admin/editPost/FormEdit');
	},
	{ ssr: false }
);

export default function EditPost() {
	return (
		<main>
			<ToggleProvider>
				<FormEdit />
			</ToggleProvider>
		</main>
	);
}
