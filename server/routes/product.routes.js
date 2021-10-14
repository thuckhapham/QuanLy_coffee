import express from 'express'
import productCtrl from '../controllers/product.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()

router.route('/api/products')
  .get(productCtrl.list)
  .post(authCtrl.requireSignin,productCtrl.create)

router.route('/api/products/:productId')
  .get(productCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.remove)

router.param('productId', productCtrl.productByID)

export default router