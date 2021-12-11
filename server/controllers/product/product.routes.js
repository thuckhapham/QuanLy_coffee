import express from 'express'
import productCtrl from './product.controller'
import authCtrl from '../auth/auth.controller'
const router = express.Router()

router.route('/api/products')
  .get(productCtrl.list)
  .post(authCtrl.requireSignin,productCtrl.create)

router.route('/api/products/:productId')
  .get(productCtrl.read)
  .put(authCtrl.requireSignin, productCtrl.update)
  .delete(authCtrl.requireSignin, productCtrl.remove)

router.param('productId', productCtrl.productByID)

export default router