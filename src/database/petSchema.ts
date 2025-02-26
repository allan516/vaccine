import mongoose from "mongoose";
import { IPetData } from "../models/IPetData";

const { Schema } = mongoose;

const userSchema = new Schema<IPetData>({
  name: String,
  age: Number,
  vaccines: [],
});

const User = mongoose.model("user", userSchema);

export default User;
