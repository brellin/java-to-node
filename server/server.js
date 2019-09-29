const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const server = express()

const authRouter = require('./routers/auth')

server.use(morgan('dev'))
server.use(helmet())
server.use(express.json())

server.use('/auth', authRouter)

module.exports = server
