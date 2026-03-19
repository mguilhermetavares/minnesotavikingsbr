import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.sanity.io",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src 'self' fonts.gstatic.com",
      "img-src 'self' data: blob: cdn.sanity.io i.ytimg.com",
      "frame-src 'self' open.spotify.com www.youtube.com",
      "connect-src 'self' cdn.sanity.io api.sanity.io www.youtube.com",
      "media-src 'self' cdn.sanity.io",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/((?!studio).*)", // Aplica em tudo exceto /studio (Sanity precisa de mais permissões)
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
