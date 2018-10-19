const expect = require('expect')
const generateMessage = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const message = generateMessage('Admin', 'Soset bibu')
    expect(message.from).toBe('Admin')
    expect(message.text).toBe('Soset bibu')
    expect(typeof message.createdAt).toBe('number')
  })
})