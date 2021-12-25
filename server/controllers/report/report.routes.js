import express from 'express' 
import authCtrl from '../auth/auth.controller'
import reportCtrl from '../report/report.controller'
const router = express.Router()


router.route('/api/report/order')
    .get(authCtrl.requireSignin, authCtrl.hasAdmin , reportCtrl.getNumberOfOrder)

    export default router