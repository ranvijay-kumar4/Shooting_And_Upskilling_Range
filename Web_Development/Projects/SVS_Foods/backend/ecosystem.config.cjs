module.exports = {
  apps: [
    {
      name: 'svs-foods-backend',
      script: './server.js',
      instances: 'max', // Utilise all available CPU cores for clustering
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '800M', // Guard against potential node memory leaks
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
