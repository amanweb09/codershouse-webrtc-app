import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5500'
const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': baseURL
    },
    withCredentials: true
})

export const sendOtp = (data) => { return api.post('/api/send-otp', data) }
export const verifyOtp = (data) => { return api.post('/api/verify-otp', data) }
export const activate = (data) => { return api.post('/api/activate', data) }
export const logout = () => { return api.post('/api/logout') }
export const createRoom = (data) => { return api.post('/api/rooms', data) }
export const getAllRooms = () => { return api.get('/api/rooms') }
export const getRoom = (roomId) => { return api.get(`/api/rooms/${roomId}`) }