const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const server = express()

const authRouter = require('./routers/auth')
const todoRouter = require('./routers/todo')

server.use(morgan('dev'))
server.use(helmet())
server.use(express.json())

server.use('/auth', authRouter)
server.use('/todos', todoRouter)

module.exports = server
