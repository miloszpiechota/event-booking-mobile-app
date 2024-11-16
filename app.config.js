// app.config.js
export default ({ config }) => ({
    ...config,
    extra: {
      API_BASE_URL: process.env.API_BASE_URL || "http://192.168.56.1:3000",
    },
  });
  