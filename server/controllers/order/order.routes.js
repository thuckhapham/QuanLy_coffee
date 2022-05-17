import express from "express";
import orderCtrl from "./order.controller";
import authCtrl from "../auth/auth.controller";
const router = express.Router();

router
  .route("/api/order")
  .get(authCtrl.requireSignin, orderCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAdmin, orderCtrl.create);

router
  .route("/api/order/:orderId")
  .get(authCtrl.requireSignin, orderCtrl.read)
  .delete(authCtrl.requireSignin, authCtrl.hasAdmin, orderCtrl.cancel);

router
  .route("/api/order/:orderId/addProduct")
  .post(authCtrl.requireSignin, authCtrl.hasAdmin, orderCtrl.addProduct);

router
  .route("/api/order/:orderId/checkout")
  .get(authCtrl.requireSignin, orderCtrl.checkOut);

router.param("orderId", orderCtrl.orderByID);

export default router;
