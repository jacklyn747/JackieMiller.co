import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone lessons in public/lessons/<name>/ are plain static builds with
  // relative asset paths. Next doesn't serve a folder's index.html, so send the
  // folder URL to the file itself (keeps ./assets/ resolving correctly).
  async redirects() {
    return [
      {
        source: "/lessons/:lesson",
        destination: "/lessons/:lesson/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
