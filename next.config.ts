import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/admin/login",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/admin-panel",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/admin-x7k9",
        destination: "/admin",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
