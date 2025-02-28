import mongoose from "mongoose";

const database = process.env.DATABASE as string;

async function connectDb() {
  try {
    await mongoose.connect(database);
    console.log("banco de dados conectado.");
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;
