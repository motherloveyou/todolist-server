const userModel = require('../models/user')
const { getModelInstance, resReturn } = require('../utils')

class UserController {
  constructor () {
    this.userModel = getModelInstance(userModel)
  }
  // 注册
  async register (req, res) {
    const { account, password, checkPassword } = req.body
    if (password !== checkPassword) {
      res.send(resReturn(null, 1, '两次密码输入不一致'))
      return
    }
    const info = await this.userModel.getAccountInfo(account)
    if (info?._id) {
      res.send(resReturn(null, 1, '账户已存在'))
      return
    }
    await this.userModel.add(account, password)
    res.send(resReturn())
  }
  // 登录
  async login (req, res) {
    const { account, password } = req.body
    const info = await this.userModel.getAccountInfo(account, password)
    if (!info?._id) {
      res.send(resReturn(null, 1, '账号或密码错误'))
      return
    }
    res.send(resReturn({ userId: info._id, account }))
  }
}

module.exports = UserController
