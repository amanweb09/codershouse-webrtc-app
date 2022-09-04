import { io } from 'socket.io-client'

export const socketInit = () => {
    const options = {
        reconnectionAttempt: Infinity,
        forceNew: true,
        timeout: 10000,
        transports: ['websocket']
    }

    return io('http://localhost:5500', options)
}