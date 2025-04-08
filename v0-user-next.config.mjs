/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Tambahkan konfigurasi untuk mengabaikan peringatan peer dependencies
  experimental: {
    // Ini akan mengabaikan peringatan peer dependencies
    // Namun, ini hanya berlaku untuk Next.js versi yang mendukung opsi ini
    // Jika tidak didukung, opsi ini akan diabaikan
    skipTrailingSlashRedirect: true,
    serverComponentsExternalPackages: []
  }
}

export default nextConfig
