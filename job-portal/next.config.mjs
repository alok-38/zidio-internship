// next.config.mjs

import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  serverActions: true, // Enable server actions feature
  // Add other Next.js configurations as needed
};

export default withSentryConfig(nextConfig, {
  // Sentry configuration options
  org: "your-sentry-org", // Replace with your Sentry organization slug
  project: "your-sentry-project", // Replace with your Sentry project slug
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
