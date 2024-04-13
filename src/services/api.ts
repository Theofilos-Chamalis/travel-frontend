export const getBackendUrl = () => {
  return useRuntimeConfig().public.BACKEND_URL || process.env.BACKEND_URL;
};
