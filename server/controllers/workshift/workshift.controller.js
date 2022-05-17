import workshiftModel from "../../models/workshift.model";
import jwt from "jsonwebtoken";
const createWorkshift = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = await jwt.verify(token, "1234"); // hide the secret

  const date = new Date().toISOString().slice(0, 10);
  const workshift = await workshiftModel.create({
    day: date,
    employee: user._id,
    cash: 1000,
  });

  res.status(200).json({ workshift });
};

const checkoutWorkshift = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = await jwt.verify(token, "1234"); // hide the secret
  if (user) {
    const shiftID = req.params.id;
    const workshift = await workshiftModel.findById(shiftID);
    if (workshift) {
      const { cash, online, note } = req.body;
      workshift.checkout = Date.now();
      workshift.cash = cash || 0;
      workshift.online = online || 0;
      workshift.note = note || "";
      const save = await workshift.save();
      if (save) {
        res
          .status(200)
          .json({ message: "Check out of workshift successfully" });
      }
    } else {
      res.status(404).json({ error: "Work shift not found" });
    }
  } else {
    res.status(404).json({ error: "Unauthorized" });
  }

  res.status(200).json({ workshift });
};
export { createWorkshift, checkoutWorkshift };
