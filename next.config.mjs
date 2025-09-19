import mdx from "@next/mdx";

// Enable MDX pages
const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

// Detect GitHub Pages build
const isGitHub = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? ""; // -> "Website-Portfolio"

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // tells Next to prepare static files
  images: { unoptimized: true }, // since GitHub Pages can’t do Next.js Image Optimization
  basePath: '/Website-Portfolio',  // repo name
  assetPrefix: '/Website-Portfolio',
};
export default withMDX(nextConfig);

