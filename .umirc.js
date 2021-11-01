const pkg = require('./package.json');

const { BUIDL_DOC_VERSION } = process.env;
const MajorVersionNumber = pkg.version.split('.')[0];
const versionSiteRoot = `refs/heads/v${MajorVersionNumber}`;
const version = BUIDL_DOC_VERSION ? versionSiteRoot : 'latest';

const serverRootDirect = process.env.NODE_ENV === 'production' ? '/rc-hooks/' : '/';
const outputPath = 'site';
const publicPath = serverRootDirect + version + '/';

const logo = 'https://www.caijinfeng.com/assets/images/logo-doly@3x.png';
const favicon = 'https://www.caijinfeng.com/assets/images/doly-touch-icon_48x48.png';

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
  locales: [['zh-CN', '中文'], ['en-US', 'English']]
};

if (process.env.NODE_ENV === 'production') {
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