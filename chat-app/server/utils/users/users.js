class Users {
  constructor() {
    this.users = []
  }

  addUser(id, name, room) {
    const user = {id, name, room}
    this.users.push(user)
    return user
  }

  removeUser(id) {
    const delIndex= this.users.findIndex(el => el.id === id)
    const delUser = this.users[delIndex]
    if (delIndex !== -1)
      this.users.splice(delIndex, 1)

    return delUser
  }

  getUsersList(room) {
    return this.users.filter((el) => el.room === room)
      .map(user => user.name)
  }

  getUser(id) {
    const index = this.users.findIndex(el => el.id === id)
    return this.users[index]
  }
}

module.exports = {Users}

