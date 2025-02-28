import mongoose from "mongoose";
import { IPetData } from "../models/IPetData";

const { Schema } = mongoose;

const userSchema = new Schema<IPetData>({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  vaccines: [],
});

const User = mongoose.model("user", userSchema);

export default User;
