import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    HOST_URL: process.env.HOST_URL
  },
  distDir: "build"
}

export default nextConfig
