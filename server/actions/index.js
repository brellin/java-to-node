const db = require('../../data/dbConfig')

module.exports = {

    getUsers: () => {
        return db('users')
    }

}
