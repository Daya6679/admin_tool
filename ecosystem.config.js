module.exports = {
  apps: [
    {
      name: "admin_tool_123",
      script: "app.js",
      cwd: process.cwd(),
      env: {
        NODE_ENV: "production",
        PORT:3050
        
      }
    }
  ]
};
