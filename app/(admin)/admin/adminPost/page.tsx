import { Posts } from '@/components';
import { ToggleProvider } from '@/components/SideNavContext';

export default function Post() {
	return (
		<main>
			<ToggleProvider>
				<Posts />
			</ToggleProvider>
		</main>
	);
}
