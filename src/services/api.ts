/**
 * Provides the backend URL to send requests to
 */
export const getBackendUrl = () => {
  const runtimeConfig = useRuntimeConfig().public;
  const PORT = process.env.PORT_NUMBER || runtimeConfig.PORT_NUMBER;
  const DOMAIN = process.env.DOMAIN || runtimeConfig.DOMAIN;
  const HTTPS = process.env.HTTPS || runtimeConfig.HTTPS;
  const IP_ADDRESS = process.env.IP_ADDRESS || runtimeConfig.IP_ADDRESS;

  if (
    HTTPS === "false" &&
    (IP_ADDRESS === "127.0.0.1" || IP_ADDRESS === "localhost")
  ) {
    return `http://127.0.0.1:${PORT}`;
  } else {
    return `https://${DOMAIN}:${PORT}`;
  }
};
