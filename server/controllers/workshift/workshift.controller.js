import workshiftModel from "../../models/workshift.model";

const getAllWorkshiftByDates = async (req, res) => {
  const dateFrom = req.query.dateFrom;
  const dateTo = req.query.dateTo;

  if (dateFrom && dateTo) {
    const dateToFormat = new Date(dateTo);
    dateToFormat.setUTCDate(dateToFormat.getUTCDate() + 1);
    const result = await workshiftModel.find({
      day: {
        $gte: dateFrom,
        $lt: dateToFormat,
      },
      valid: true,
    });
    if (result?.length > 0) {
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error: "No Workshift found" });
    }
  } else {
    res.status(403).json({ error: "Dates not valid" });
  }
};

const getWorkshiftById = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const result = await workshiftModel.findById(id);
    if (result) {
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error: "No Workshift found!!!" });
    }
  } else {
    res.status(403).json({ error: "Invalid Workshift ID" });
  }
};

const createWorkshift = async (req, res) => {
  const user = req.auth;
  const date = new Date().toISOString().slice(0, 10);
  const result = await workshiftModel.create({
    day: date,
    employee: user._id,
    cash: 0,
  });
  if (result) {
    res
      .status(201)
      .json({ message: "Create workshif successfully", _id: result._id });
  } else {
    res.status(401).json({ error: "Failed to create a workshift" });
  }
};

const updateWorkshift = async (req, res) => {
  const id = req.params.id;
  const workshift = req.body;
  console.log(id);
  console.log(workshift);
  if (id) {
    const result = await workshiftModel.findByIdAndUpdate(
      id,
      { ...workshift },
      { returnDocument: "after" }
    );
    if (result) {
      res.status(200).json({ message: "Update workshift successfully" });
    } else {
      res.status(404).json({ error: "Workshift not found!" });
    }
  }
};
const deleteWorkshift = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const result = await workshiftModel.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Delete workshift successfully" });
    } else {
      res.status(404).json({ error: "Workshift not found!" });
    }
  }
};
const checkoutWorkshift = async (req, res) => {
  const user = req.auth;
  if (user) {
    const shiftID = req.params.id;
    const workshift = await workshiftModel.findByIdAndUpdate(
      shiftID,
      {
        checkout: Date.now(),
        ...req.body,
      },
      { returnDocument: "after" }
    );
    if (workshift) {
      res.status(200).json({ message: "Checkout workshift successfully" });
    } else {
      res.status(404).json({ error: "Work shift checkout failed" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
export {
  createWorkshift,
  checkoutWorkshift,
  getWorkshiftById,
  getAllWorkshiftByDates,
  updateWorkshift,
  deleteWorkshift,
};
