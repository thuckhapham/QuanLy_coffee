import express from 'express'
import orderCtrl from '../controllers/order.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()

router.route('/api/order/history').get(authCtrl, orderCtrl.getHistoryOrder)

router.route('/api/order/:orderId/checkout')
.post(authCtrl.requireSignin,orderCtrl.checkout)

router.route('/api/order').get(authCtrl.requireSignin, orderCtrl.list)
.post(authCtrl.requireSignin, orderCtrl.create)

router.route('/api/order/:orderId')
    .get(authCtrl.requireSignin,orderCtrl.read)
    .put(authCtrl.requireSignin,orderCtrl.update)
    
