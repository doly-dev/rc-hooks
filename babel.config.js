module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        node: 'current'
      }
    }],
    '@babel/react',
    '@babel/typescript'
  ]
}