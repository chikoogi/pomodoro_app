/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // 독립 실행형 빌드
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig; 