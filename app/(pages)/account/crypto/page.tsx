import CryptoPage from '@/components/Account/Crypto/CryptoPage';
import { ToggleProvider } from '@/components/SideNavContext';

export default function Crypto() {
	return (
		<main>
			<ToggleProvider>
				<CryptoPage />
			</ToggleProvider>
		</main>
	);
}
