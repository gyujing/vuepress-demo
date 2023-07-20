module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  // base:"/",
  configureWebpack: {
    resolve: {
      alias: {
        'img': path.resolve(__dirname, './public/img')
      }
    }
  }
}
