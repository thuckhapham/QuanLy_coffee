import User from '../../models/user.model'
import extend from 'lodash/extend'


const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    console.info(`UserName: ${user.userName} is registed`)
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json(
      {error : "bad request"}
    )
  }
}

/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
  try {
    console.info(`find userId: ${id}`)

    let user = await User.findById(id)
    if (!user){
      console.error(`UserId: ${id} not found`)
      return res.status('400').json({
        error: "User not found"
      })
    }
    req.profile = user
    console.error(`UserId: ${id} found`)
    next()
  } catch (err) {
    return res.status(400).json(
      {error : "bad request"}
    )
  }
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  console.info(`Read userId: ${req.profile.id}`)
  return res.json(req.profile)
}

const list = async (req, res) => {
  try {
    console.info('get list user')
    let users = await User.find().select('userName email firstName lastName updated created enable')
    
    console.info('get list user finished')

    res.json(users)
  } catch (err) {
    console.error(err)
    return res.status(400).json(
      {error : "bad request"}
    )
  }
}

const update = async (req, res) => {
  try {
    console.info(`update user: ${req.profile.id}`)
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    console.info(`update user: ${req.profile.id} finished`)
    res.json(user)
  } catch (err) {
    console.error(err)
    return res.status(400).json(
      {error : "bad request"}
    )
  }
}

const remove = async (req, res) => {
  try {
    console.info(`delete user:  ${req.profile.id}`)
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    console.info(`delete user: ${req.profile.id} finished`)
    res.json(deletedUser)
  } catch (err) {
    console.error(err)
    return res.status(400).json(
      {error : "bad request"}
    )
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