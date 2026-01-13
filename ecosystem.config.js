module.exports = {
  apps: [
    {
      name: "admin_tool",
      script: "npm",
      args: "start",
      cwd: "/var/www/admin_tool",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
