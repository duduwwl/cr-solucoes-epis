import type { NextConfig } from 'next';

const githubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: githubPages ? 'export' : undefined,
  basePath: githubPages ? '/cr-solucoes-epis' : '',
  assetPrefix: githubPages ? '/cr-solucoes-epis/' : undefined,
  trailingSlash: true,
};
export default nextConfig;
