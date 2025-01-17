import { defineConfig } from 'dumi';
import { toNumber } from 'ut2';
import { version, name } from './package.json';

const { BUILD_DOC_VERSION, NODE_ENV } = process.env;

const isDev = NODE_ENV === 'development';

const MajorVersion = toNumber(version.split('.')[0]);
const PreviousVersion = MajorVersion - 1;

const serverRootDirect = isDev ? '/' : '/rc-hooks/';
const gitVersionPath = BUILD_DOC_VERSION ? `refs/heads/v${MajorVersion}` : 'latest';
const publicPath = serverRootDirect + gitVersionPath + '/';

const outputPath = 'site';

const logo = 'https://doly-dev.github.io/logo.png';
const favicons = ['https://doly-dev.github.io/favicon.png'];

export default defineConfig({
  themeConfig: {
    name,
    logo,
    footer: 'doly-dev | Copyright © 2020-present',
    nav: [
      {
        title: '指南',
        link: '/guide'
      },
      {
        title: 'Hooks',
        link: '/hooks'
      },
      {
        title: 'GitHub',
        link: `https://github.com/doly-dev/${name}`
      },
      {
        title: '更新日志',
        link: `https://github.com/doly-dev/${name}/releases`
      },
      {
        title: `v${PreviousVersion}.x`,
        link: `https://doly-dev.github.io/rc-hooks/refs/heads/v${PreviousVersion}/index.html`
      }
    ]
  },
  resolve: {
    atomDirs: [{ type: 'hooks', dir: 'src' }]
  },
  history: {
    type: 'hash'
  },
  hash: true,
  favicons,
  publicPath,
  outputPath,
  analytics: {
    ga_v2: 'G-P755RQJZZ2'
  }
});
