module.exports = {
  assetsDir: 'src/assets',
  outputDir: '../server/public/dist',
  devServer: {
    port: 3000,
    proxy: {
      '/api/': {
        target: 'http://localhost:3001',
        ws: true,
        changeOrigin: true
      }
    }
  }
}