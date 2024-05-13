import { personModel, personJoiSchema } from "../Models/personDetail.js";
import { Ecrpy_schema } from "../Models/bcrypt.js";
import { customResponse } from "../utils/customResponse.js";
import bcrypt from "bcrypt";

// ------------------------------------------------------Validation post ----------------------------------------
let createUser = async (req, res) => {
  const { error, value } = personJoiSchema.validate(req.body);
  if (error) {
    return res.json(error.message);
  }
  let details = new personModel(value);
  await details
    .save()
    .then((msg) => {
      customResponse(res, 200, "Working Succesful", msg);
    })
    .catch((error) => {
      return res.json(error);
    });
};

// -----------------------------------get pagination ---------------------------------------

let getUser = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  let skip = (page - 1) * limit;
  const users = await personModel.find().limit(limit).skip(skip);
  return res.json(users);
};

// ----------------------------------------Specific People by OR condition------------------------------------------

let specificUser = async (req, res) => {
  let values = create_filter(req);
  const users = await personModel.find(values);
  return res.json(users);
};

function create_filter(req) {
  let values = {};
  let conditions = [];
  if (req.query.gender) {
    conditions.push({ gender: req.query.gender });
  }
  if (req.query.country) {
    conditions.push({ country: req.query.country });
  }
  if (req.query.active) {
    conditions.push({ active: req.query.active });
  }
  if (conditions.length > 0) {
    values["$or"] = conditions;
  }

  return values;
}

// --------------------------------------------------bCrypt_post-------------------------------------------------

let eCryptModel = async (req, res) => {
  const userName = req.body.username;
  const email = req.body.email;
  const ecryptpass = req.body.password;
  const hashedPassword = await bcrypt.hash(ecryptpass, 10);

  let ecryptData = new Ecrpy_schema({
    username: userName,
    password: hashedPassword,
    email: email,
  });

  try {
    const save_data = await ecryptData.save();
  } catch (err) {
    return res
      .status(400)
      .json({ status: "Fail", message: err.errorResponse.errmsg });
  }
  res.json(save_data);
};

// ---------------------------------------------get only one user -------------------------------------------------

let oneUser = async (req, res) => {
  const value = req.query.username;
  const user_value = await Ecrpy_schema.find({ username: value });
  if (user_value.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user_value);
};

let oneUser2 = async (req, res) => {
  const value = req.query.username;
  const user_value = await Ecrpy_schema.find({ username: value });
  if (user_value.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user_value);
};

export { createUser, getUser, specificUser, eCryptModel, oneUser };
