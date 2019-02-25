module.exports = {
    publicPath: '/objstore/',
    devServer: {
      proxy: {
        '^/api': {
        //   target: 'http://localhost:3000',
             target: 'http://61.8.173.88',
          changeOrigin: true,  
        //   pathRewrite:{'^/api' : '/'}
        
        }
      }
    }
  }