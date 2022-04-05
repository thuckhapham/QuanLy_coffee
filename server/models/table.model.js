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
    default: "AVAILABLE",
    enum: ["AVAILABLE", "USED", "BROKEN"],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Table", TableSchema);
