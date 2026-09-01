import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // Configuração para o Turbopack (Usado em ambiente de desenvolvimento)
    turbopack: {
        rules: {
            '*.svg': {
                loaders: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                        },
                    },
                ],
                as: '*.js',
            },
        },
    },
    // Configuração para o Webpack (Usado automaticamente pelo Next.js no 'next build')
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default nextConfig;
