import dotenv from "dotenv";
import {app } from "./app.js";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});




connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(` Server is running at port : http://localhost:${process.env.PORT}`);
      console.log("STARTING SERVER on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

  app.get("/check", (req, res) => {
  res.send("Server is running");
});
  app.get("/", (req, res) => {
  res.send("Server is running");
});