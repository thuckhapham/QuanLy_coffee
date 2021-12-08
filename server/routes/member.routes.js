import express from 'express'
import memberCtrl from '../controllers/member.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()

router.route('/api/member')
  .get(authCtrl.requireSignin, memberCtrl.list)
  .post(authCtrl.requireSignin,memberCtrl.create)

router.route('/api/member/find').get(authCtrl.requireSignin, memberCtrl.getMemberByPhoneorEmail)  

router.route('/api/discount/:memberId')
  .get(authCtrl.requireSignin,memberId.read)
  .put(authCtrl.requireSignin,  memberId.update)
  .delete(authCtrl.requireSignin, memberId.remove)

router.param('memberId', memberId.memberByID)

export default router