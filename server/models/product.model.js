import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  image: String,
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ["TEA", "COFFEE", "COOKIES", "FRUIT", "OTHER"],
  },
  price: {
    type: Number,
    required: "Price is required",
  },
  available: {
    type: Boolean,
    default: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", ProductSchema);
