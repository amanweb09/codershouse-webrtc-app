const crypto = require('crypto')
const hashService = require('./hash-service')


class OtpService {

    generateOtp() {
        return crypto.randomInt(1000, 9999)
    }

    sendBySms() {}

    verifyOtp(hashedOtp, data) {
        const computedHash = hashService.hashOtp(data)        
        return computedHash === hashedOtp
    }

}

module.exports = new OtpService()