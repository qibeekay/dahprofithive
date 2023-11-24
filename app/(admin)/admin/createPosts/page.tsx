'use client';
// import { Form } from '@/components';
import { ToggleProvider } from '@/components/SideNavContext';
import dynamic from 'next/dynamic';
const Form = dynamic(
	() => {
		return import('@/components/admin/createPost/Form');
	},
	{ ssr: false }
);

export default function CreatePost() {
	return (
		<main>
			<ToggleProvider>
				<Form />
			</ToggleProvider>
		</main>
	);
}
