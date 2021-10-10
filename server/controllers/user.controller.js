import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    console.log(`${user.userName} is registed`)
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
  try {
    console.log(`find id: ${id}`)

    let user = await User.findById(id)
    if (!user){
      console.log(`${id} not found`)
      return res.status('400').json({
        error: "User not found"
      })
    }
    req.profile = user
    console.log(`id: ${id} found`)
    next()
  } catch (err) {
    console.log(err)
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  console.log(`Read userId: ${req.profile.id}`)
  return res.json(req.profile)
}

const list = async (req, res) => {
  try {
    console.log('get list user')
    let users = await User.find().select('userName email firstName lastName updated created enable')
    
    console.log('get list user finished')

    res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    console.log(`update ${req.profile.id}`)
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    console.log(`update ${req.profile.id} finished`)
    res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    console.log(`delete ${req.profile.id}`)
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    console.log(`delete ${req.profile.id} finished`)
    res.json(deletedUser)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update
}