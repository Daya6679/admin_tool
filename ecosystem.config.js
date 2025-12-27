module.exports = {
  apps: [
    {
      name: 'admin-tool-3000',
      script: 'index.js',
      env: {
        PORT: 3000,
      },
    },
    {
      name: 'admin-tool-3001',
      script: 'index.js',
      env: {
        PORT: 3001,
      },
    },
    {
      name: 'admin-tool-3002',
      script: 'index.js',
      env: {
        PORT: 3002,
      },
    },
  ],
};
