module.exports.add = (a, b) => a + b
module.exports.square = x => x * x
module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(module.exports.add(a, b))
  }, 1000)
}