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
  telemetry: false,
});
