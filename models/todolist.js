const BaseModel = require('./base')

class TodolistModel extends BaseModel {
  getName () {
    return 'Todolist'
  }
  getSchema () {
    return {
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
  add (content) {
    return this.model.insertMany({
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
  query (todolistIdArray, pattern) {
    return this.model.find({ _id: { $in: todolistIdArray }, content: pattern })
  }
}

module.exports = TodolistModel