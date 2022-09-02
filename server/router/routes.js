
const router = require('express').Router()


const authController = require('../controllers/auth-controller')
const activateController = require('../controllers/activate-controller')

const authenticate = require('../middleware/auth-middleware')

router.post('/api/send-otp', authController.sendOtp)
router.post('/api/verify-otp', authController.verifyOtp)
router.post('/api/activate', authenticate, activateController.activate)
router.get('/api/refresh', authenticate, authController.refresh)
router.post('/api/logout', authenticate, authController.logout)

module.exports = router