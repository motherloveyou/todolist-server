const mongoose = require('mongoose')

class BaseModel {
  constructor () {
    this.name = this.getName()
    this.schema = mongoose.Schema(this.getSchema(), { versionKey: false })
    this.model = mongoose.model(this.name, this.schema, this.name)
  }
}

module.exports = BaseModel