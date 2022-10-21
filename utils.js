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

module.exports = {
  getModelInstance,
  resReturn
}