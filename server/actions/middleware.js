const jwt = require('jsonwebtoken')

module.exports = {

    restricted: (req, res, next) => {

        const token = req.headers.authorization

        if (token) {

            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({
                        message: 'Error verifying token.'
                    })
                } else {
                    req.decoded = decodedToken
                    next()
                }
            })

        } else {
            res.status(401).json({
                message: 'Error verifying token.'
            })
        }

    }

}
