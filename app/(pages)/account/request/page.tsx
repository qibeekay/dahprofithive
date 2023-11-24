import RequestPage from '@/components/Account/Request/RequestPage';
import { ToggleProvider } from '@/components/SideNavContext';

export default function Request() {
	return (
		<main>
			<ToggleProvider>
				<RequestPage />
			</ToggleProvider>
		</main>
	);
}
