const instances = new Map()

const getModelInstance = (m, ...args) => {
  if (!instances.get(m)) {
    instances.set(m, new m(...args))
  }
  return instances.get(m)
}

const resReturn = (data, error, errDesc) => {
  return {
    error: error || 0,
    errDesc,
    data
  }
}

const jwt = require('jsonwebtoken')
const secretKey = 'todolist_server_zoucaiyuan'
const expiresIn = 3 * 24 * 60 * 60  // token有效时间  单位秒

// 生成token
const jwtSign = (data) => {
  return jwt.sign(data, secretKey, { expiresIn })
}

//验证token
const jwtVerify = async (req, res) => {
  const { access_token } = req.headers
  try {
    const { account, password } = jwt.verify(access_token, secretKey)
    // 返回access_token对应的用户信息
    const userModel = require('./models/user')
    const item = await getModelInstance(userModel).getAccountInfo(account, password)
    return item
  } catch (error) {
    res.send(resReturn(null, 1, '无效token，请重新登录'))
    console.log(error)
  }
}

module.exports = {
  getModelInstance,
  resReturn,
  jwtSign,
  jwtVerify
}