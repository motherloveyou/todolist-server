const mongoose = require('mongoose')
const BaseModel = require('./base')

class TodolistModel extends BaseModel {
  getName () {
    return 'Todolist'
  }
  getSchema () {
    return {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: {
        type: String,
        required: true
      },
      done: {
        type: Boolean,
        required: true
      }
    }
  }
  // 插入list
  add (userId, content) {
    return this.model.insertMany({
      userId,
      content,
      done: false
    })
  }
  // 删除list
  delete (todolistId) {
    return this.model.deleteOne({ _id: todolistId })
  }
  // 更新list
  modify (todolistId, content, done) {
    return this.model.updateOne({ _id: todolistId }, { $set: { content, done } })
  }
  // 查询list
  query (userId, pattern) {
    return this.model.find({ userId, content: pattern })
  }
}

module.exports = TodolistModel