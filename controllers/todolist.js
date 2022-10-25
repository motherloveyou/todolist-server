const todolistModel = require('../models/todolist')
const userModel = require('../models/user')
const { getModelInstance, resReturn } = require('../utils')

class TodolistController {
  constructor () {
    this.todolistModel = getModelInstance(todolistModel)
    this.userModel = getModelInstance(userModel)
  }
  // 添加list
  async add (req, res) {
    const { userId, content } = req.body
    const item = await this.todolistModel.add(content)
    await this.userModel.addTodolistId(userId, item[0]._id)
    res.send(resReturn())
  }
  // 删除list
  async delete (req, res) {
    const { userId, todolistId } = req.body
    await this.todolistModel.delete(todolistId)
    await this.userModel.deleteTodolistId(userId, todolistId)
    res.send(resReturn())
  }
  // 修改list
  async modify (req, res) {
    const { todolistId, content, done } = req.body
    await this.todolistModel.modify(todolistId, content, done)
    res.send(resReturn())
  }
  // 查询list
  async query (req, res) {
    const { userId, searchContent } = req.query
    const todolistIdArray = await this.userModel.getTodolistId(userId)
    const pattern = searchContent ? new RegExp(['', ...searchContent, ''].join('.*'), 'i') : /.*/
    const result = await this.todolistModel.query(todolistIdArray, pattern)
    res.send(resReturn(result))
  }
}

module.exports = TodolistController