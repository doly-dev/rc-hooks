const path = require("path");
const pkg = require("./package.json");

module.exports = {
  enter: path.resolve(__dirname, './src/app.js'),

  html: {
    template: "src/document.ejs",
    filename: "index.html"
  },

  // 别名
  alias: {
    "~": path.join(__dirname, "./src"),
    react: path.resolve('./node_modules/react')
  },

  // 定义编译时变量替换
  define: {
    // api 地址
    API_URL: "",
    DEV: true
  },

  extraBabelPlugins: [
    ['import', { libraryName: 'antd', style: true }],
    ['import', { libraryName: 'rc-hooks', camel2DashComponentName: false }, "rc-hooks"]
  ],

  // 不同环境配置
  env: {
    // 生产环境
    production: {
      publicPath: "/", // 静态资源基础域名路径，如 https://img.99bill.com/
      html: {
        template: "src/document.ejs",
        filename: "index.html", // 构建后的html路径，如 seashell/webapp/x-project/agent/index.html
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      },
      outputPath: "../demo",
      outputFilename: "res/j/[name].[chunkhash:8].js", // js入口构建后路径
      outputChunkFilename: "res/j/[name].[chunkhash:8].chunk.js", // js块构建后路径
      css: {
        filename: "res/c/[name].[contenthash:8].css", // css文件构建后路径
        chunkFilename: "res/c/[name].[contenthash:8].chunk.css" // css块构建后路径
      },
      image: {
        name: "res/i/[name].[hash:8].[ext]", // 图片构建后路径
        limit: 1024 * 8 // 小于该大小的图片转为base64
      },
      define: {
        API_URL: "", // 生产环境的api地址
        DEV: false
      }
    }
  }
};
