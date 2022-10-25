const mongoose = require('mongoose')
const BaseModel = require('./base')

class UserModel extends BaseModel {
  getName () {
    return 'User'
  }
  getSchema () {
    return {
      todolistId: [mongoose.Schema.Types.ObjectId],
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
      todolistId: [],
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
  // 获取用户表的todolistId数组
  async getTodolistId (userId) {
    const res = await this.model.findOne({ _id: userId })
    return res?.todolistId ?? []
  }
  // 增加todolistId
  async addTodolistId (userId, todolistId) {
    await this.model.updateOne({ _id: userId }, { $addToSet: { todolistId }})
  }
  // 删除todolistId
  async deleteTodolistId (userId, todolistId) {
    await this.model.updateOne({ _id: userId }, { $pull: { todolistId }})
  }
}

module.exports = UserModel