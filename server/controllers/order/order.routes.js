import express from 'express'
import orderCtrl from './order.controller'
import authCtrl from '../auth/auth.controller'
const router = express.Router()

router.route('/api/order')
.post(authCtrl.requireSignin, orderCtrl.create)
.get(authCtrl.requireSignin, orderCtrl.list)

router.route('/api/order/:orderId').get(authCtrl.requireSignin,orderCtrl.read)

router.route('/api/order/:orderId/addProduct').post(authCtrl.requireSignin,orderCtrl.addProduct)

router.route('/api/order/:orderId/checkout').get(authCtrl.requireSignin,orderCtrl.checkOut)

router.param('orderId', orderCtrl.orderByID)

export default router
    
