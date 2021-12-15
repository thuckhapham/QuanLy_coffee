import express from 'express'
import productCtrl from './product.controller'
import authCtrl from '../auth/auth.controller'

const router = express.Router()

router.route('/api/products')
  .get(productCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAdmin ,productCtrl.uploadImg,productCtrl.create)

router.route('/api/products/:productId')
  .get(productCtrl.read)
  .put(authCtrl.requireSignin,  authCtrl.hasAdmin  ,productCtrl.uploadImg, productCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAdmin , productCtrl.remove)

router.param('productId', productCtrl.productByID)

export default router