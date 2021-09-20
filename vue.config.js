const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@constants': path.resolve(__dirname, 'src/constants'),
      },
      extensions: ['.js', '.vue', '.json']
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
