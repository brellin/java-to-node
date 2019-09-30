require('dotenv').config()

const server = require('./server/server')

const port = process.env.PORT || 5000

const log = `Server is running on port ${port}!`

server.listen(port, () => {
    console.log(`\n${'='.repeat(log.length + 2)}\n ${log}\n${'='.repeat(log.length + 2)}\n`)
})
