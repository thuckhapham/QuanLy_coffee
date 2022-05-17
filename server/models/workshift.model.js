import mongoose from "mongoose";

const WorkshiftSchema = new mongoose.Schema(
  {
    day: {
      type: Date,
      default: new Date().toISOString().slice(0, 10),
      required: "Work date is required",
    },
    employee: {
      type: String,
      required: "Employee is required",
    },
    checkin: {
      type: Date,
      default: Date.now(),
    },
    checkout: {
      type: Date,
    },
    cash: {
      type: Number,
      default: 0,
      required: "Amount of money is required",
    },
    online: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
      default: "",
    },
    countOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workshift", WorkshiftSchema);
