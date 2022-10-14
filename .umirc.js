const pkg = require('./package.json');

const { BUIDL_DOC_VERSION } = process.env;
const MajorVersionNumber = pkg.version.split('.')[0];
const versionSiteRoot = `refs/heads/v${MajorVersionNumber}`;
const version = BUIDL_DOC_VERSION ? versionSiteRoot : 'latest';

const isDev = process.env.NODE_ENV === 'development';

const serverRootDirect = !isDev ? '/rc-hooks/' : '/';
const outputPath = 'site';
const publicPath = serverRootDirect + version + '/';

const logo = 'https://doly-dev.github.io/logo.png';
const favicon = 'https://doly-dev.github.io/favicon.png';

const umiConfig = {
  extraBabelPlugins: [[
    'babel-plugin-import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
  ]],
  mode: 'doc',
  history: {
    type: 'hash'
  },
  title: pkg.name,
  logo,
  favicon,
  publicPath,
  outputPath,
  hash: true,
  locales: [['zh-CN', '中文'], ['en-US', 'English']],
  // esbuild: !isDev,
  nodeModulesTransform: {
    type: isDev ? 'none' : 'all'
  },
  targets: {
    ie: 11,
  },
  polyfill: {
    imports: ['element-remove', 'core-js']
  },
};

if (!isDev) {
  umiConfig.headScripts = [
    { src: 'https://www.googletagmanager.com/gtag/js?id=G-P755RQJZZ2', async: true },
    {
      content: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-P755RQJZZ2');
    `}
  ];
  umiConfig.chunks = ['vendors', 'umi'];
  umiConfig.chainWebpack = function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /node_modules/,
              chunks: "all",
              name: "vendors",
              priority: -10,
              enforce: true
            }
          }
        }
      }
    });
  }
}

export default umiConfig;