require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5500
const server = require('http').createServer(app)
const cors = require('cors')
const cookieParser = require('cookie-parser')
const ACTIONS = require('./actions')

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

require('./database')()

app.use('/storage', express.static('storage'))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(require('./router/routes'))

const socketUserMapping = {}

io.on('connection', (socket) => {

    socket.on(ACTIONS.JOIN, ({
        roomId,
        user
    }) => {
        socketUserMapping[socket.id] = user
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []) /* get all the users in the room */

        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user
            })

            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMapping[clientId]
            })
        })

        socket.join(roomId)
    })

    /* Handle relay ice */
    socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, { peerId: socket.id, icecandidate })
    })

    /* Handle relay session description (SDP) */
    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, { peerId: socket.id, sessionDescription })
    })

    /* leaving the room */
    function leaveRoom({ roomId }) {
        const { rooms } = socket
        Array.from(rooms).forEach(roomId => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])

            clients.forEach(clientId => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: socketUserMapping[socket.id]?._id
                })

                socket.emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: socketUserMapping[clientId]?._id
                })
            })

            socket.leave(roomId)
        })

        delete socketUserMapping[socket.id]
    }
    socket.on(ACTIONS.LEAVE, leaveRoom)
    socket.on('disconnecting', leaveRoom)

})


server.listen(PORT, () => console.log(`listening server on ${PORT}`))