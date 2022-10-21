const mongoose = require('mongoose')
const BaseModel = require('./base')

class TodolistModel extends BaseModel {
  getName () {
    return 'Todolist'
  }
  getSchema () {
    return {
      user: {
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
  add (content) {
    return this.model.insertMany({
      content,
      done: false
    })
  }
  delete (_id) {
    return this.model.deleteOne({ _id })
  }
  modify (_id, content, done) {
    return this.model.updateOne({ _id }, { $set: { content, done } })
  }
  query (condition = {}) {
    return this.model.find(condition)
  }
}

module.exports = TodolistModel