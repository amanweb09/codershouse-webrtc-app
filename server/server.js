require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5500
const cors = require('cors')
const cookieParser = require('cookie-parser')


require('./database')()

app.use('/storage', express.static('storage'))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(require('./router/routes'))


app.listen(PORT, () => console.log(`listening server on ${PORT}`))