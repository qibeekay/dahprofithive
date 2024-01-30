import dynamic from 'next/dynamic';

const ForgotPassword = dynamic(() => import('@/components/ForgotPassword'), {
	ssr: false, // This disables server-side rendering
});

export default function ForgotPword() {
	return (
		<main>
			<ForgotPassword />
		</main>
	);
}
