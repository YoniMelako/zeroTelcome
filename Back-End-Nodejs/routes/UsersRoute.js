const express = require("express");
const router = express.Router();
const UsersModel = require("../models/user");
const RegisterValidation = require("../validation/users/RegisterValidation");
const LoginVal = require("../validation/users/LoginValidation");
const cookieParser = require("cookie-parser");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const data = req.body;
  console.log(data);

  const { error, isVaild } = RegisterValidation(req.body);
  if (!isVaild) return res.status(207).json({ error: error });
  else {
    UsersModel.register(data).then(result => {
      if (result.success) {
        res.status(200).json(result);
      } else if (result.error) {
        res.status(207).json(result);
      }
    });
  }
});

router.post("/login", (req, res) => {
  const data = req.body;

  const { error, isVaild } = LoginVal(req.body);
  if (!isVaild) return res.status(200).json({ error: error });
  else {
    UsersModel.login(data).then(result => {
      if (result.success) {
        // console.log(result);

        return res
          .status(200)
          .json({ success: "user loged in", auth: result.userInfo });
      }
    });
  }
});

var checkToken = (req, res, next) => {
  if (req.body.userToken) {
    var token = req.body.userToken;
    // console.log(token);

    jwt.verify(token, config.secretKey, function(err, decoder) {
      if (err) {
        console.log(err);

        return res.status(207).json({ error: "not good" });
      }

      req.decoder = decoder;
      next();
      // return res.json({
      //   success: true,
      //   _id: token._id
      // });
    });
  } else {
    return res.status(207).json({ error: "not connect" });
  }
};

router.post("/addline", checkToken, (req, res, next) => {
  console.log(req.decoder);
  let data = {
    user_id: req.decoder.id,
    lineid: req.body.lineToAdd
  };
  UsersModel.addLine(data).then(result => {
    console.log(result);

    if (result.success) {
      res.status(200).json({ success: true });
    }
  });
});

router.post("/userlines", checkToken, (req, res, next) => {
  let data = {
    user_id: req.decoder.id
  };
  UsersModel.getuserlines(data).then(lines => {
    res.status(200).json({ lines });
  });
});

router.post("/removeLine", checkToken, (req, res, next) => {
  console.log("immm hereeeee");

  let lineID = req.body.lineID;
  let userID = req.decoder.id;

  console.log("lineID :");
  console.log(lineID);

  console.log("userID :");
  console.log(userID);

  UsersModel.removelineFromUser(lineID, userID).then(result => {
    if (result.success) {
      res.status(200).json(result);
      console.log("Delete Success");
    } else {
      res.status(400).json(false);
      console.log("oops, problem to delete");
    }
  });
});

module.exports = router;
