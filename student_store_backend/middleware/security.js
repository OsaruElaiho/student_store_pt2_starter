const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../utils/errors")

const jwtFrom = ({ headers }) => {
    // It should take in in a request object and 
    // checks to see if the request has an authorization header.
    if (headers?.authorization) {
      const [scheme, token] = headers.authorization.split(" ")
      if (scheme.trim() === "Bearer") {
        return token
      }
    }
  
    return undefined
}

const extractUserFromJwt = (req, res, next) => {
    try {
      const token = jwtFrom(req)
      if (token) {
        res.locals.user = jwt.verify(token, SECRET_KEY)
      }
  
      return next()
    } catch (err) {
      return next()
    }
  }

  const requireAuthenticatedUser = (req, res, next) => {
    try {
      const { user } = res.locals
      if (!user?.email){
        throw new UnauthorizedError()
      }
      return next()
    } catch (error) {
      return next(error)
    }
  }

module.exports = {
    jwtFrom,
    extractUserFromJwt,
    requireAuthenticatedUser,
}