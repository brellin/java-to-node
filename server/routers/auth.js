const router = require('express').Router()

const Users = require('../actions')

router.get('/login', (req, res) => {
    Users.getUsers()
        .then(existing => {
            res.status(200).json(existing)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error.",
                err
            })
        })
})

module.exports = router
