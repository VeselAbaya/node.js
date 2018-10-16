const env = process.env.NODE_ENV || 'development' // NODE_ENV - for heroku and defines by heroku

if (env === 'development') {
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') { // env === test if exec "npm run test-watch"
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}