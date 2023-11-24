/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['bcrypt'],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
