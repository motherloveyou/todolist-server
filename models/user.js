const BaseModel = require('./base')

class UserModel extends BaseModel {
  getName () {
    return 'User'
  }
  getSchema () {
    return {
      account: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    }
  }
  // 插入用户账号信息
  add (account, password) {
    return this.model.insertMany({
      account,
      password
    })
  }
  // 获取账号信息
  async getAccountInfo (account, password) {
    if (password) {
      return await this.model.findOne({ account, password })
    } else {
      return await this.model.findOne({ account })
    }
  }
}

module.exports = UserModel