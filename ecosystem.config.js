module.exports = {
  apps: [{
    name: "onetime",
    script: "npx",
    args: "serve -s build -l 3020",
    env: {
      NODE_ENV: "production",
    },
  }]
};
