// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  },
};

export default nextConfig;
