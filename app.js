import express from "express";
import { conn_string } from "./conn_mangoDB.js";
import {
  createUser,
  getUser,
  specificUser,
  eCryptModel,
  oneUser,
} from "./Controllers/User_Controller.js";

const app = express();
app.use(express.json());
const port = 3000;
conn_string();

app.get("/api/get-users", getUser);
app.post("/api/person-detail", createUser);
app.get("/api/get-specific-user", specificUser); // all user name "usama" and other statement also will show
app.post("/api/ecrypt-password", eCryptModel);
app.get("/api/get-one-user", oneUser);

app.listen(port, () => {
  console.log(`server running ${port}`);
});
