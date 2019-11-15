const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoute = require("./routes/UsersRoute");
const LinesRoute = require("./routes/LinesRoute");

const validator = require("validator");
const app = express();
const config = require("./config/config");

app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users/", UserRoute);
app.use("/lines/", LinesRoute);

mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => {
  console.log("connection open");
})
  .on("error", err => {
    console.log({ connectionError: err, message: err.message });
  })
  .on("disconnected", () => {
    console.log("connection disconnected");
  });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
