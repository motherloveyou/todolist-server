const todolistModel = require('../models/todolist')
const { getModelInstance, resReturn } = require('../utils')

class TodolistController {
  constructor () {
    this.todolistModel = getModelInstance(todolistModel)
  }
  async add (req, res) {
    const { content } = req.body
    await this.todolistModel.add(content)
    res.send(resReturn())
  }
  async delete (req, res) {
    const { _id } = req.body
    await this.todolistModel.delete(_id)
    res.send(resReturn())
  }
  async modify (req, res) {
    const { _id, content, done } = req.body
    await this.todolistModel.modify(_id, content, done)
    res.send(resReturn())
  }
  async query (req, res) {
    // console.log(req.query)
    const result = await this.todolistModel.query()
    res.send(resReturn(result))
  }
}

module.exports = TodolistController