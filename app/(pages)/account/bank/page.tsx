import BankPage from '@/components/Account/Bank/BankPage';
import { ToggleProvider } from '@/components/SideNavContext';

export default function Bank() {
	return (
		<main>
			<ToggleProvider>
				<BankPage />
			</ToggleProvider>
		</main>
	);
}
