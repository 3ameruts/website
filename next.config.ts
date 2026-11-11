import type { NextConfig } from "next";

/**
 * Architecture note: this is a content site whose pages are fully static per
 * locale (generateStaticParams). Cache Components / PPR is intentionally left
 * off — there is no per-request data, and keeping hidden routes mounted
 * (Activity) would complicate scroll-driven animation teardown.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Allows a second build side by side (e.g. QA) without touching the running one.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
    deviceSizes: [480, 768, 1080, 1440, 1920],
  },
  /**
   * Locale routing without middleware (fully supported on every host, incl.
   * Cloudflare Workers): English by default; a visitor who chose Arabic
   * (NEXT_LOCALE cookie) is sent to Arabic.
   */
  async redirects() {
    const localeLess = "/:path((?!en(?:/|$)|ar(?:/|$)|_next/|api/|media/|brand/|[^/]*\\.[^/]*$).+)";
    type Redirects = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>;
    const rules: Redirects = [
      // One canonical host for inner pages: JorAdvanced.com/... → www.JorAdvanced.com/...
      // (the bare "/" is served directly, see rewrites — link previews need no redirect hops)
      {
        source: "/:path+",
        has: [{ type: "host", value: "joradvanced.com" }],
        destination: "https://www.joradvanced.com/:path+",
        permanent: true,
      },
      // "/" for a visitor who chose Arabic
      { source: "/", has: [{ type: "cookie", key: "NEXT_LOCALE", value: "ar" }], destination: "/ar", permanent: false },
    ];
    // Paths without a locale prefix (e.g. /products)
    rules.push(
      { source: localeLess, has: [{ type: "cookie", key: "NEXT_LOCALE", value: "ar" }], destination: "/ar/:path", permanent: false },
      { source: localeLess, destination: "/en/:path", permanent: false },
    );
    return rules;
  },
  /**
   * The bare domain serves the English home page directly (no redirect), so
   * WhatsApp/social previews of "JorAdvanced.com" find the preview image at once.
   */
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/en" }], afterFiles: [], fallback: [] };
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
