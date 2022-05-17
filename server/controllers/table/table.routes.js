import express from "express";
import tableCtrl from "./table.controller";
import authCtrl from "../auth/auth.controller";
const router = express.Router();

router
  .route("/api/table")
  .get(tableCtrl.list)
  .post(authCtrl.requireSignin, tableCtrl.create);

router
  .route("/api/table/:tablePoin")
  .get(tableCtrl.read)
  .put(authCtrl.requireSignin, tableCtrl.update)
  .delete(authCtrl.requireSignin, tableCtrl.remove);

router
  .route("/api/table/insertOrder/:tablePoin")
  .put(authCtrl.requireSignin, tableCtrl.insertOrderToTable);
router
  .route("/api/table/:tablePoin/status")
  .post(authCtrl.requireSignin, tableCtrl.tableStatus);

router.param("tablePoin", tableCtrl.tableByPoin);

export default router;
