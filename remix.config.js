// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176
// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the remix server. The CLI will eventually
// stop passing in HOST, so we can remove this workaround after the next major release.
if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL ||
    process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  serverModuleFormat: "cjs",
  dev: { port: process.env.HMR_SERVER_PORT || 8002 },
  serverBuildTarget: "node-cjs",
  server: "./server.js",
  serverDependenciesToBundle: "all",
  devServerBroadcastDelay: 1000,
  future: {
    unstable_dev: {
      proxy: {
        "/api/customers": "http://localhost:3001"
      }
    }
  },
  routes: async (defineRoutes) => {
    return defineRoutes((route) => {
      route('invoicePreview', 'routes/invoicePreview.jsx');
      route('invoice', 'routes/invoice.jsx');
      route('template.movie', 'routes/template.movie.jsx');
    });
  },
};
