import express from "express";
import authCtrl from "../auth/auth.controller";
import {
  createWorkshift,
  updateWorkshift,
  deleteWorkshift,
  checkoutWorkshift,
  getAllWorkshiftByDates,
  getWorkshiftById,
} from "./workshift.controller";

const workshiftRouter = express.Router();

workshiftRouter.route("/checkin").post(authCtrl.requireSignin, createWorkshift);
workshiftRouter.route("/dates").get(getAllWorkshiftByDates);
workshiftRouter
  .route("/:id")
  .get(authCtrl.requireSignin, authCtrl.hasAdmin, getWorkshiftById)
  .put(authCtrl.requireSignin, authCtrl.hasAdmin, updateWorkshift)
  .delete(authCtrl.requireSignin, authCtrl.hasAdmin, deleteWorkshift);
workshiftRouter
  .route("/:id/checkout")
  .put(authCtrl.requireSignin, checkoutWorkshift);

export default workshiftRouter;
