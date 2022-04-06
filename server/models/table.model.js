import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  tablePoin: {
    type: String,
    unique: "TablePoin already exists",
    required: "TablePoin is required",
  },
  description: String,
  status: {
    type: String,
<<<<<<< HEAD
    default: "INIT",
    enum: ["INIT", "WAIT", "COMPLETE"],
=======
    default: "AVAILABLE",
    enum: ["AVAILABLE", "USED", "BROKEN"],
>>>>>>> 0e9448dd1d7d7e51ffa56757637c7d4ebd823196
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
<<<<<<< HEAD
  ordersId: {
    type: [String],
    default: [],
  },
=======
>>>>>>> 0e9448dd1d7d7e51ffa56757637c7d4ebd823196
});

export default mongoose.model("Table", TableSchema);
