require('dotenv').config()

const server = require('./server/server')

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`\n=================================\n Server is running on port ${port}! \n=================================\n`)
})
