import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../config/config'

const signin = async (req, res) => {
  try {
    console.info(`sigin: ${req.body.userName}`)
    let user = await User.findOne({
      "userName": req.body.userName
    })
    if (!user)
      {
        console.info(`sigin: ${req.body.userName} not found`)
        return res.status('401').json({
        error: "User not found"
      })
    }

    if (!user.authenticate(req.body.password)) {
      console.info(`sigin: ${req.body.userName} password don't match`)
      return res.status('401').send({
        error: "Username and password don't match."
      })
    }

    const token = jwt.sign({
      _id: user._id,
      userName: user.userName,
      role : user.role
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })
    console.info(`sigin: ${req.body.userName} finished`)
    return res.json({
      token,
      token_type: "Bearer"
    })

  } catch (err) {
    console.error(err)
    return res.status('401').json({
      error: "Could not sign in"
    })

  }
}

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256']
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    console.error("User is not authorized")
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization
}