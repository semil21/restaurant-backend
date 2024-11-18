import mongoose from "mongoose";

export const adminLoginSchema = new mongoose.Schema({
  restaurant: {
    type: String,
  },
  type: {
    type: String,
    requrie: true,
  },
  restaurantAddress: {
    type: String,
    requrie: true,
  },
  restaurantContact: {
    type: String,
    requrie: true,
  },
  parking: {
    type: Boolean,
    requrie: true,
  },
  owner: {
    type: String,
    requrie: true,
  },
  email: {
    type: String,
    requrie: true,
  },
  password: {
    type: String,
    requrie: true,
  },
  ownerContact: {
    type: String,
    requrie: true,
  },
  ownerAddress: {
    requrie: true,
    type: String,
  },
  gst: {
    type: String,
  },
});

export const adminLogin = mongoose.model("Restaurant", adminLoginSchema);
