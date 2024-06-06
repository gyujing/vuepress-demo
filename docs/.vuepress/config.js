const sass = require("sass");
const fiber = require('fibers');

module.exports = {
  title: 'vuepress-demo',
  description: 'Vue component library template.',
  extraWatchFiles: [
    '/package/**/*.*'
  ],
  themeConfig: {
    sidebar: [
      {
        title: '组件库',
        children: [
          "/authHandler/",
        ]
      },
    ]
  },
  scss: {
    implementation: sass,
    fiber,
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                happyPackMode: true,
                appendTsSuffixTo: ['\\.vue$'],
              },
            },
          ],
        },
      ],
    },
  },
}
