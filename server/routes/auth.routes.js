import express from 'express'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

/**
 * @swagger
 * components:
 *   parameters:
 *         userName
 *         password
 *    example:
 *         userName: admin
 *         password: admin123456
 */
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: signin 
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: token and user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/login'
 */

router.route('/auth/signin')
  .post(authCtrl.signin)
router.route('/auth/signout')
  .get(authCtrl.signout)

export default router