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

/* @type {import('@remix-run/dev').AppConfig} */
export const ignoredRouteFiles = ["**/.*"];
export const appDirectory = "app";
export const assetsBuildDirectory = "public/build";
export const publicPath = "/build/";
export const serverBuildDirectory = "build";
export const devServerPort = 8002;
export const serverModuleFormat = "cjs";
export const dev = { port: process.env.HMR_SERVER_PORT || 8002 };
export const serverBuildTarget = "node-cjs";
export const server = "./server.js";
export const serverDependenciesToBundle = "all";
export const devServerBroadcastDelay = 1000;
export const future = {
  unstable_dev: {
    proxy: {
      "/api/customers": "http://localhost:3001"
    }
  }
};
export async function routes(defineRoutes) {
  return defineRoutes((route) => {
    route('invoicePreview', 'routes/invoicePreview.jsx');
    route('invoice', 'routes/invoice.jsx');
    route('template.movie', 'routes/template.movie.jsx');
  });
}