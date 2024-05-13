import mongoose from "mongoose";
function conn_string() {
  mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => {
      console.log("successful coonection");
    })
    .catch(() => {
      console.log("Error");
    });
}

export { conn_string };
