const env = process.env.NODE_ENV || 'dev'

if (env === 'dev') {
  const envConfig = require('./config.json')
  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key]
  })
}