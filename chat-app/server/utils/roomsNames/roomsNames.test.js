const expect = require('expect')
const roomsNames = require('./roomsNames')

describe('RoomsNames', () => {
  it('should add new name into LOTR room', () => {
    roomsNames.addName('LOTR', 'Antay')
    expect(roomsNames.data.find(roomNames => roomNames.name === 'lotr').names[0])
      .toBe('antay')
  })

  it('should get all names from LOTR room', () => {
    roomsNames.addName('loTr', 'Katya')
    expect(roomsNames.getNames('lotr')).toEqual(['antay', 'katya'])
  })

  it('should remove name from LOTR room', () => {
    roomsNames.removeName('loTR', 'Antay')
    expect(roomsNames.getNames('lotr')).toEqual(['katya'])
  })
})