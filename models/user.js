const BaseModel = require('./base')

class UserModel extends BaseModel {
  getName () {
    return 'User'
  }
  getSchema () {
    return {
      account: String,
      password: String
    }
  }
  add (account, password) {
    return this.model.insertMany({
      account,
      password
    })
  }
  async checkAccountExist (account) {
    const res = await this.model.findOne({ account })
    return !!res
  }
  async match (account, password) {
    const res = await this.model.findOne({ account, password })
    return !!res
  }
}

module.exports = UserModel