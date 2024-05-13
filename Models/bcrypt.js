import mongoose from "mongoose";

let ecryptModel = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

ecryptModel.index({ email: 1 }, { unique: true });

let Ecrpy_schema = mongoose.model("Ecryption", ecryptModel);
export { Ecrpy_schema };
