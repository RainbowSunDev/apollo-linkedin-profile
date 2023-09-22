const pkg = require('../../package.json')

module.exports = {
  app: pkg.name,
  version: pkg.version,
  env: process.env.NODE_ENV !== 'production' ? 'dev' : 'prod',
}
