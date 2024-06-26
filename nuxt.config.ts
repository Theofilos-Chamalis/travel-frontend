export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "src/",
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  routeRules: {
    "/": { swr: 3 }, // Cache the homepage for 1 hour, since there will be minimal changes to it
    "/travels/**": { ssr: false }, // Disable SSR for all routes starting with /travels/ to improve interaction performance
  },
  typescript: {
    typeCheck: "build", // Enable type checking at build time
    strict: true, // Enable strict type checking options
  },
  runtimeConfig: {
    // Configure runtime environment variables
    public: {
      PORT_NUMBER: process.env.PORT_NUMBER,
      DOMAIN: process.env.DOMAIN,
      IP_ADDRESS: process.env.IP_ADDRESS,
      HTTPS: process.env.HTTPS,
    },
  },
  devServer: {
    port: 3100, // Change the default port for local dev to 3100
  },
  telemetry: false,
});
