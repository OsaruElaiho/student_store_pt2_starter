const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

const generateToken = (data) => jwt.sign(data, SECRET_KEY)

const createUserJwt = (user) => {
    // creates a payload with that user's email and admin status.
    const payload = {
        email: user.email,
        isAdmin: user.isAdmin || false,
    }
    
    // return the result of calling the generateToken method on that payload
    return generateToken(payload)
}

const validateToken = (token) => {
    try {
      // Try to verify the token with the jsonwebtoken package and the SECRET_KEY
      const decoded =  jwt.verify(token, SECRET_KEY)
      return decoded
    } catch (err) {
      // If anything goes wrong, return an empty object.
      return {}
    }
}

module.exports = {
    generateToken,
    createUserJwt,
    validateToken,
}