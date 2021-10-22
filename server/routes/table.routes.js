import express from 'express'
import tableCtrl from '../controllers/table.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()

router.route('/api/table')
  .get(tableCtrl.list)
  .post(authCtrl.requireSignin,tableCtrl.create)

router.route('/api/table/:tableId')
  .get(authCtrl.requireSignin, tableCtrl.read)
  .put(authCtrl.requireSignin,  tableCtrl.update)
  .delete(authCtrl.requireSignin, tableCtrl.remove)

router.param('tableId', tableCtrl.tableById)

export default router