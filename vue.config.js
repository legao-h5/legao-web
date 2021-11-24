module.exports = {
  devServer: {
    port:8080,
    disableHostCheck: true,
    proxy: {
      // 配置跨域
      '/project': {
        target: 'http://localhost:7001',
        // ws:true,
        changOrigin: true,
        // pathRewrite: {
        //   '^/api': '/',
        // },
      },
    },
  },
  configureWebpack: config => {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 300000, // 依赖包超过300000bit将被单独打包
        automaticNameDelimiter:'-',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `chunk.${packageName.replace('@', '')}`;
            },
            priority:10
          }
        }
      }
    }
  }

}
