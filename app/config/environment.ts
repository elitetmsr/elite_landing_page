/**
 * Central place for runtime-configurable values.
 * Extend as needed (e.g. TOKENS, FEATURE FLAGS).
 */
const environment = {
  apiBaseUrl: "https://elite-tech.com", // For Production
  // apiBaseUrl: "https://dev.elite-tech.com", // For Development
  isDev: process.env.NODE_ENV !== "production",
  logLevel: process.env.NODE_ENV === "production" ? "warn" : "debug",
};

export default environment;
