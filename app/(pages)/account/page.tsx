import AccountPage from '@/components/Account/AccountPage';
import { ToggleProvider } from '@/components/SideNavContext';

export default function Account() {
	return (
		<main>
			<ToggleProvider>
				<AccountPage />
			</ToggleProvider>
		</main>
	);
}
