import express from 'express'
import userCtrl from './user.controller'
import authCtrl from '../auth/auth.controller'
const router = express.Router()

router.route('/api/users')
  .get(authCtrl.requireSignin,  userCtrl.list)
  .post( authCtrl.requireSignin, authCtrl.hasAdmin, userCtrl.create)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
 

router.route('/api/users/:userId/role').post(authCtrl.requireSignin, authCtrl.hasAdmin, userCtrl.setRole)

router.route('/api/users/:userId/disnable').get(authCtrl.requireSignin, authCtrl.hasAdmin, userCtrl.disnable)

router.route('/api/users/:userId/enable').get(authCtrl.requireSignin, authCtrl.hasAdmin, userCtrl.enable)

router.param('userId', userCtrl.userByID)

router.route('/api/users/changepwd').post(authCtrl.requireSignin, userCtrl.changePassword)

export default router