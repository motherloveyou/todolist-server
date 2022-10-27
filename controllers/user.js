const userModel = require('../models/user')
const { getModelInstance, resReturn, jwtSign, jwtVerify } = require('../utils')

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
    const item = await this.userModel.getAccountInfo(account, password)
    if (!item?._id) {
      res.send(resReturn(null, 1, '账号或密码错误'))
      return
    }
    const access_token = jwtSign({ account, password })
    res.send(resReturn({ userId: item._id, account, access_token }))
  }
  //  根据access_token查询用户信息
  async getUserInfo (req, res, next) {
    const { account } = await jwtVerify(req, res, next)
    res.send(resReturn(account))
  }
}

module.exports = UserController
