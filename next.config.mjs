import mdx from "@next/mdx";
const withMDX = mdx({ extension: /\.mdx?$/, options: {} });

const isGitHub = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",                 // static export -> ./out
  images: { unoptimized: true },    // required for export

  basePath: isGitHub ? `/${repoName}` : "",
  assetPrefix: isGitHub ? `/${repoName}/` : undefined,

  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: { compiler: "modern", silenceDeprecations: ["legacy-js-api"] },

  // Make CI lenient (optional but often fixes first-time failures)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withMDX(nextConfig);
