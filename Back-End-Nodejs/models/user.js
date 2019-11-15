const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LinesModel = require("./Lines");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cofing = require("../config/config");
const jwt = require("jsonwebtoken");

const UsersSchema = Schema({
  Isbusiness: { type: Boolean, default: false },
  Firstname: { type: String, required: true },
  Lastname: { type: String, required: true },
  ID: { type: String, required: true },
  Address: { type: String, required: true },
  City: { type: String, required: true },
  BirthDay: { type: Date },
  password: { type: String, required: true, minlength: 6 },
  CellularPack: [
    {
      type: Schema.Types.ObjectId,
      ref: "lines"
    }
  ],
  RegisterDate: { type: Date, default: Date.now() },
  isActive: { type: Boolean, default: true }
});

const Users = mongoose.model("User", UsersSchema);

register = data => {
  return new Promise((resolve, teject) => {
    console.log(data);
    Users.findOne({ ID: data.Id, isActive: true }).then(user => {
      if (user) return resolve({ error: "user already exist" });
      else {
        let cryptPassword = bcrypt.hashSync(data.password, saltRounds);

        let newuser = Users({
          Firstname: data.firstname,
          Lastname: data.lastname,
          ID: data.Id,
          BirthDay: data.birthday,
          Address: data.address,
          City: data.city,
          password: cryptPassword
        });

        newuser
          .save()
          .then(result => {
            if (result) {
              return resolve({ success: true, user: result });
            }
          })
          .catch(err => {
            console.log(err);
            return resolve({
              error: "user already exist or something wrong",
              err: err
            });
          });
      }
    });
  });
};

login = data => {
  return new Promise((resolve, reject) => {
    let userInfo = {
      token: "",
      loggedIn: false,
      name: "",
      Isbusiness: ""
    };

    Users.findOne({ ID: data.Id, isActive: true }).then(user => {
      //console.log(client);

      if (user) {
        bcrypt.compare(data.password, user.password).then(match => {
          if (match) {
            const token = jwt.sign(
              {
                id: user._id,
                packeges: user.CellularPack,
                Isbusiness: user.Isbusiness
              },
              cofing.secretKey,
              { expiresIn: "100h" }
            );
            userInfo.name = user.Firstname;
            userInfo.token = token;
            userInfo.loggedIn = true;
            userInfo.Isbusiness = user.Isbusiness;

            return resolve({
              success: "the password same",
              userInfo: userInfo
            });
          } else {
            console.log("no match");
            return resolve({ error: "password not match" });
          }
        });
      } else {
        console.log("something wrong");
        return resolve({ error: "something wrong" });
      }
    });
  });
};

addLine = data => {
  return new Promise((resolve, reject) => {
    let userid = data.user_id;
    console.log(userid);

    Users.findOne({ _id: userid }).then(user => {
      if (user) {
        user.CellularPack.push(data.lineid);
        user.save();
        return resolve({ success: true });
      }
    });
  });
};

getuserlines = data => {
  return new Promise((resolve, reject) => {
    let userid = data.user_id;

    Users.findOne({ _id: userid }).then(user => {
      if (user) {
        console.log(user.CellularPack);

        let lines = user.CellularPack.map(line => {
          return line;
        });

        LinesModel.findUserlines(lines).then(Userlines => {
          console.log(Userlines);

          return resolve(Userlines);
        });
      }
    });
  });
};

removelineFromUser = (lineID, userID) => {
  return new Promise((resolve, reject) => {
    Users.findOne({ _id: userID }).then(user => {
      user.CellularPack.splice(user.CellularPack.indexOf(lineID), 1);
      user.save();
      return resolve({ success: true, updatedUserLines: user.CellularPack });
    });
  });
};

module.exports = {
  register: register,
  login: login,
  addLine: addLine,
  getuserlines: getuserlines,
  removelineFromUser: removelineFromUser
};
