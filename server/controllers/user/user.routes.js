import express from "express";
import userCtrl from "./user.controller";
import authCtrl from "../auth/auth.controller";
const router = express.Router();

router
  .route("/api/users")
  .get(authCtrl.requireSignin, userCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAdmin, userCtrl.create);

router
  .route("/api/users/info/changepwd")
  .post(authCtrl.requireSignin, userCtrl.changePassword);

router
  .route("/api/users/info")
  .get(authCtrl.requireSignin, userCtrl.readMe)
  .put(authCtrl.requireSignin, userCtrl.updateMe);

router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAdmin, userCtrl.update);

router
  .route("/api/users/:userId/role")
  .post(authCtrl.requireSignin, authCtrl.hasAdmin, userCtrl.setRole);

router
  .route("/api/users/:userId/disnable")
  .get(authCtrl.requireSignin, authCtrl.hasAdmin, userCtrl.disnable);

router
  .route("/api/users/:userId/enable")
  .get(authCtrl.requireSignin, authCtrl.hasAdmin, userCtrl.enable);

router.param("userId", userCtrl.userByID);

export default router;
