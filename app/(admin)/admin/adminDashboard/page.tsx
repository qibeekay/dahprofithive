// import { Dashboard } from '@/components';
import { ToggleProvider } from '@/components/SideNavContext';
import dynamic from 'next/dynamic';
const Dashboard = dynamic(
	() => {
		return import('@/components/admin/dashboard/Dashboard');
	},
	{ ssr: false }
);

export default function Admin() {
	return (
		<main>
			<ToggleProvider>
				<Dashboard />
			</ToggleProvider>
		</main>
	);
}
