module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  chainWebpack(config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
  // 为当前的主题提供一些配置
  themeConfig: {
    // 侧边栏
    sidebar: [
      {
        title: '基础组件',
        children: [
          "/radio/",
          "/button/",
        ]
      }
    ]
  }
}
