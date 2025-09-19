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
  // REQUIRED for GitHub Pages (outputs static site to ./out)
  output: "export",

  // REQUIRED for export: disable Next image optimizer
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "www.google.com", pathname: "**" },
    ],
  },

  // Pages is served at https://rohoxoxo.github.io/Website-Portfolio/
  // so assets must be prefixed with /Website-Portfolio
  basePath: isGitHub ? `/${repoName}` : "",
  assetPrefix: isGitHub ? `/${repoName}/` : undefined,

  // your existing options
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: { compiler: "modern", silenceDeprecations: ["legacy-js-api"] },
};

// Keep MDX enabled
export default withMDX(nextConfig);
