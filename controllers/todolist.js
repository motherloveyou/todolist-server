const todolistModel = require('../models/todolist')
const { getModelInstance, resReturn, jwtVerify } = require('../utils')

class TodolistController {
  constructor () {
    this.todolistModel = getModelInstance(todolistModel)
  }
  // 添加list
  async add (req, res) {
    const { _id: userId } = await jwtVerify(req, res)
    const { content } = req.body
    const item = await this.todolistModel.add(userId, content)
    res.send(resReturn())
  }
  // 删除list
  async delete (req, res) {
    await jwtVerify(req, res)
    const { todolistId } = req.body
    await this.todolistModel.delete(todolistId)
    res.send(resReturn())
  }
  // 修改list
  async modify (req, res) {
    await jwtVerify(req, res)
    const { todolistId, content, done } = req.body
    await this.todolistModel.modify(todolistId, content, done)
    res.send(resReturn())
  }
  // 查询list
  async query (req, res) {
    const { _id: userId } = await jwtVerify(req, res)
    const { searchContent } = req.query
    const pattern = searchContent ? new RegExp(['', ...searchContent, ''].join('.*'), 'i') : /.*/
    const result = await this.todolistModel.query(userId, pattern)
    res.send(resReturn(result))
  }
}

module.exports = TodolistController