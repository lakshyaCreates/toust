import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    transpilePackages: ["@workspace/ui", "@workspace/db"],
};

export default nextConfig;
