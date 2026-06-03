/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow large video files in public folder
  experimental: {
    largePageDataBytes: 512 * 1024,
  },
  // Proper headers for video streaming
  async headers() {
    return [
      {
        source: '/:path*.MP4',
        headers: [
          { key: 'Accept-Ranges', value: 'bytes' },
          { key: 'Content-Type', value: 'video/mp4' },
          { key: 'Cache-Control', value: 'public, max-age=31536000' },
        ],
      },
      {
        source: '/:path*.mp4',
        headers: [
          { key: 'Accept-Ranges', value: 'bytes' },
          { key: 'Content-Type', value: 'video/mp4' },
          { key: 'Cache-Control', value: 'public, max-age=31536000' },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
