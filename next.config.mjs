/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        styledComponents: true,
    },
    experimental: {
		serverActions: {
			allowedForwardedHosts: ['localhost',"https://xmc9vrjg-3000.use.devtunnels.ms/"],
			allowedOrigins: ['http://localhost',"https://xmc9vrjg-3000.use.devtunnels.ms/"]
		},
	}
};

export default nextConfig;
