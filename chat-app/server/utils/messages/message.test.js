const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const message = generateMessage('Admin', 'Soset bibu')
    expect(message.from).toBe('Admin')
    expect(message.text).toBe('Soset bibu')
    expect(typeof message.createdAt).toBe('number')
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = "Admin"
    const lat = 15
    const lon = 19
    const url = `https://www.google.com/maps?q=${lat},${lon}`
    const message = generateLocationMessage(from, lat, lon)

    expect(typeof message.createdAt).toBe('number')
    expect(message.url).toBe(url)
  })
})