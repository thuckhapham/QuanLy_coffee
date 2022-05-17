import express from "express";
import authCtrl from "../auth/auth.controller";
import { createWorkshift, checkoutWorkshift } from "./workshift.controller";

const workshiftRouter = express.Router();

workshiftRouter.route("/checkin").post(authCtrl.requireSignin, createWorkshift);
workshiftRouter
  .route("/:id/checkout")
  .put(authCtrl.requireSignin, checkoutWorkshift);

export default workshiftRouter;
