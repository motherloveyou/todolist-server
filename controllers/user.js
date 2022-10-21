const userModel = require('../models/user')
const { getModelInstance, resReturn } = require('../utils')

class UserController {
  constructor () {
    this.userModel = getModelInstance(userModel)
  }
  async register (req, res) {
    const { account, password, checkPassword } = req.body
    if (password !== checkPassword) {
      res.send(resReturn(null, 1, '两次密码输入不一致'))
      return
    }
    const isExist = await this.userModel.checkAccountExist(account)
    if (isExist) {
      res.send(resReturn(null, 1, '账户已存在'))
      return
    }
    await this.userModel.add(account, password)
    res.send(resReturn())
  }
  async login (req, res) {
    const { account, password } = req.body
    const isMatch = await this.userModel.match(account, password)
    if (!isMatch) {
      res.send(resReturn(null, 1, '账号或密码错误'))
      return
    }
    res.send(resReturn())
  }
}

module.exports = UserController
