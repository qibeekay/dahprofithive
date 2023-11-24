import { Users } from '@/components';
import { ToggleProvider } from '@/components/SideNavContext';

export default function Transactions() {
	return (
		<main>
			<ToggleProvider>
				<Users />
			</ToggleProvider>
		</main>
	);
}
