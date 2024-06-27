// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.themoviedb.org/3',
        changeOrigin: true,
      },
    },
  },
};


