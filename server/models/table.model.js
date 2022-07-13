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
    default: "INIT",
    enum: ["INIT", "WAIT", "DELIVERED" ,"COMPLETE"],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  ordersId: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("Table", TableSchema);
