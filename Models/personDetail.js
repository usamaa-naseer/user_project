import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import Joi from "joi";

let personSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: Number,
  gender: String,
  country: String,
  phoneNumber: String,
  role: String,
  active: Boolean,
});

personSchema.index({ email: 1 }, { unique: true });
personSchema.index({ gender: 1 }, { unique: true });

let personJoiSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
  country: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  role: Joi.string().required(),
  active: Joi.bool().required(),
});

let personModel = mongoose.model("user_validationsaa", personSchema);

export { personModel, personJoiSchema };
