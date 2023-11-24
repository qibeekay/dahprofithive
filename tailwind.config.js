/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'primary-blue': '#2F9FF8',
				'amber-blue': '#072D4B',
			},
			lineClamp: {
				2: '2',
				8: '8',
				9: '9',
				10: '10',
			},
		},
		screens: {
			xs: '350px',
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
			poppins: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
