module.exports = {
  apps: [{
    name: "admin_tool",
    script: "app.js",
    cwd: "/var/www/admin_tool",
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "production"
    }
  }]
};
