import express from 'express'
import orderCtrl from '../controllers/order.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()

router.route('/api/order')
.post(authCtrl.requireSignin, orderCtrl.create)

router.route('/api/order/:orderId/addProduct').post(authCtrl.requireSignin,orderCtrl.addProduct)

router.param('orderId', orderCtrl.orderByID)

export default router
    
