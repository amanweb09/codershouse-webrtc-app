const { connect, connection } = require('mongoose')

module.exports = function () {
    connect(process.env.LOCAL_DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    connection.on('error', () => {console.log('db connection failed')})
    connection.once('open', () => {console.log('db connected...')})
}