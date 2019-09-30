const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Users = require('../actions').users
const { restricted } = require('../actions/middleware')
const { catchErrorHandler } = require('./functions')

router.get('/users', restricted, async (req, res) => {

    console.log(req.decoded)

    const users = await Users.getUsers()

    try {

        res.status(200).json(users.map(user => {
            return {
                username: user.username,
                id: user.id
            }
        }))

    } catch (err) {

        catchErrorHandler(res)

    }

})

router.get('/user', restricted, async (req, res) => {

    const { username } = req.decoded

    try {

        const me = await Users.getUserByUsername(username)

        if (!me) {

            res.status(400).json({ message: 'I have no idea what happened here. Please try again.' })

        } else {

            res.status(200).json({ username: me.username, id: me.id })

        }

    } catch (err) {

        catchErrorHandler(res)

    }

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) res.status(400).json({ message: 'Must have a username and password.' })

    try {

        const user = await Users.getUserByUsername(username)

        if (!user) res.status(404).json({ message: `'${username}' does not exist.` })


        if (bcryptjs.compareSync(password, user.password)) {

            const token = tokenMaker(user)

            res.status(202).json({
                message: `Welcome, ${username}! Here is your token:`,
                token
            })

        } else {

            res.status(400).json({ message: 'Passwords do not match.' })

        }

    } catch (err) {

        catchErrorHandler(res)

    }

})

router.post('/register', async (req, res) => {

    let { username, password } = req.body

    try {

        const user = await Users.getUserByUsername(username)

        if (user) {

            if (bcryptjs.compareSync(password, user.password)) {

                const token = tokenMaker(user)

                res.status(202).json({
                    message: `Welcome, ${username}! Here is your token:`,
                    token
                })

            } else {

                res.status(400).json({ message: 'Passwords do not match.' })

            }

        } else {

            password = bcryptjs.hashSync(password, 12)

            const newUser = await Users.createUser({ username, password })

            const token = tokenMaker(newUser)

            res.status(201).json({
                message: `Welcome, ${username}! Here is your token:`,
                token
            })

        }

    } catch (err) {

        catchErrorHandler(res)

    }

})

module.exports = router

function tokenMaker(user) {

    const payload = {
        user_id: user.id,
        username: user.username
    },
        options = {
            expiresIn: '1d'
        }

    return jwt.sign(payload, process.env.JWT_SECRET, options)

}
