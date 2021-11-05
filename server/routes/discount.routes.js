import express from 'express'
import discountCtrl from '../controllers/discount.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()

router.route('/api/discount')
  .get(authCtrl.requireSignin, discountCtrl.list)
  .post(authCtrl.requireSignin,discountCtrl.create)

router.route('/api/discount/:discountId')
  .get(discountCtrl.read)
  .put(authCtrl.requireSignin,  discountCtrl.update)
  .delete(authCtrl.requireSignin, discountCtrl.remove)

router.param('discountId', discountCtrl.discountById)

export default router