/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// Allow loading images from Cloudinary (res.cloudinary.com) used by uploads
// See: https://nextjs.org/docs/messages/next-image-unconfigured-host
nextConfig.images = {
  domains: ['res.cloudinary.com'],
}

module.exports = nextConfig
