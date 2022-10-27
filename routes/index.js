const express = require('express')
const router = express.Router()
const { jwtVerify } = require('../utils')

const TodolistController = require('../controllers/todolist')
const UserlistController = require('../controllers/user')
const TodolistModel = require('../models/todolist')

const INTERFACE_CONFIG = {
  todolist: {
    prefix: '/todolist',
    controller: TodolistController
  },
  user: {
    prefix: '/user',
    controller: UserlistController
  }
}
const routerConfig = {
  todolist: [
    {
      action: 'add',
      method: 'post',
      path: '/add'
    },
    {
      action: 'delete',
      method: 'post',
      path: '/delete'
    },
    {
      action: 'modify',
      method: 'post',
      path: '/modify'
    },
    {
      action: 'query',
      method: 'get',
      path: '/query'
    }
  ],
  user: [
    {
      action: 'register',
      method: 'post',
      path: '/register'
    },
    {
      action: 'login',
      method: 'post',
      path: '/login'
    },
    {
      action: 'getUserInfo',
      method: 'get',
      path: '/getUserInfo'
    }
  ]
}

Object.keys(routerConfig).forEach(module => {
  const routes = routerConfig[module]
  routes.forEach(route => {
    const { prefix, controller } = INTERFACE_CONFIG[module]
    const { action, method, path } = route
    router[method](prefix + path, async (req, res, next) => {
      const instance = new controller()
      await instance[action].call(instance, req, res)
    })
  })
})

module.exports = router
