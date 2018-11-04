const {Users} = require('./users')
const expect = require('expect')

describe('Users', () => {
  let users

  beforeEach(() => {
    users = new Users()
    users.users = [{
        id: '1',
        name: 'Antay',
        room: 'Awesome room'
      },
      {
        id: '2',
        name: 'Mike',
        room: 'Awesome room'
      },
      {
        id: '3',
        name: 'Paul',
        room: 'Sosi room'
      }
    ]
  })

  it('Should add new user', () => {
    const user = {
      id: '/#124pogjeorjgdf',
      name: 'Antay',
      room: 'Awesome room'
    }

    expect(users.addUser(user.id, user.name, user.room)).toEqual(user)
    expect(users.users.length).toBe(4)
  })

  it('Should return names for Awesome room', () => {
    expect(users.getUsersList('Awesome room')).toEqual(['Antay', 'Mike'])
  })

  it('Should remove user', () => {
    const removedUser = users.removeUser('3')

    expect(removedUser).toEqual({
      id: '3',
      name: 'Paul',
      room: 'Sosi room'
    })
    expect(users.getUsersList('Sosi room').length).toBe(0)
  })

  it('Shouldn\'t remove user', () => {
    expect(users.removeUser('1234')).toBeFalsy()
    expect(users.users.length).toBe(3)
  })

  it('Should find user', () => {
    expect(users.getUser('2')).toEqual(users.users[1])
  })

  it('Shouldn\'t find user', () => {
    expect(users.getUser('5')).toBeFalsy()
  })
})
