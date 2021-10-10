import express from 'express'
import productCtrl from '../controllers/product.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()

router.route('/api/products')
  .get(userCtrl.list)
  .post(authCtrl.requireSignin,authCtrl.hasAuthorization,productCtrl.create)

router.route('/api/products/:productId')
  .get(userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.remove)

router.param('productId', productCtrl.productByID)

export default router