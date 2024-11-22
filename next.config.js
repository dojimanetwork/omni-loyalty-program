/** @type {import('next').NextConfig} */

const path = require("path");

module.exports = {
  basePath: "/omni-loyalty-program",
  assetPrefix: "/omni-loyalty-program",
  reactStrictMode: true,
  images: { unoptimized: true, loader: "default", path: "/omni-loyalty-program" },
  webpack: (config) => {
    config.resolve.modules.push(path.resolve("./"));
    config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });

    return config;
  },
};
