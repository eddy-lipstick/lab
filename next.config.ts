// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  },
};

module.exports = nextConfig;
