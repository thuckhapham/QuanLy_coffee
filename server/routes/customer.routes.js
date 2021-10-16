import express from 'express'
import authCtrl from '../controllers/auth.controller'
import customerCtrl from '../controllers/customer.controller'
const router = express.Router()

router.route('/api/customer')
.post(authCtrl.requireSignin, customerCtrl.create)
.get(authCtrl.requireSignin, customerCtrl.getListCustomer)

router.route('/api/member')
.get(authCtrl.requireSignin,customerCtrl.getListMember)
.post(authCtrl.requireSignin, customerCtrl.createMember)

router.route('/api/member/level')
.post(authCtrl.requireSignin, customerCtrl.createMemberLevel)
.get(authCtrl.requireSignin, customerCtrl.getListMemberLevel)
export default router