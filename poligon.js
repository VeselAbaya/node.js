let obj = {}
Object.defineProperty(obj, 'property', {
  get: function () {
    return this.property
  },
  set: function (value) {
    this.property = value
  }
})
obj.property = 21;
console.log(obj.property);