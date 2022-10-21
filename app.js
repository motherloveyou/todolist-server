const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes')
const app = express()

mongoose.connect('mongodb://localhost:27017/todolist')
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败', err))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(router)

module.exports = app
