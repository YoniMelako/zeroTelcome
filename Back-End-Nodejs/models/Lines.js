const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinesSchema = Schema({
  name: { type: String, required: true },
  call_minutes: { type: String, required: true },
  internet_giga: { type: String, required: true },
  overseas_calls: { type: String, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  AddDate: { type: Date, default: Date.now() }
});

const Lines = mongoose.model("line", LinesSchema);

addLine = data => {
  return new Promise((resolve, reject) => {
    Lines.findOne({ name: data.name }).then(line => {
      if (line) {
        return resolve({ error: "this line already exist" });
      } else {
        let newline = Lines({
          name: "gold",
          call_minutes: "100",
          internet_giga: "100",
          overseas_calls: "100",
          price: 50
        });
        newline
          .save()
          .then(result => {
            if (result) {
              console.log(result);
              return resolve({ success: true });
            }
          })
          .catch(err => {
            console.log(err);
            console.log(err);
          });
      }
    });
  });
};

getAllLines = () => {
  return new Promise((resolve, reject) => {
    Lines.find().then(lines => {
      if (lines) {
        return resolve({ success: true, lines: lines });
      } else {
        return resolve({ error: "something goes wrong" });
      }
    });
  });
};

findUserlines = lines => {
  let packs = [];

  return new Promise((resolve, reject) => {
    const results = lines.map(async x => {
      if (x !== null) {
        return Lines.findOne({ _id: x }).then(line => {
          packs.push(line);
        });
      }
    });
    Promise.all(results).then(completed => {
      console.log(packs);
      return resolve(packs);
    });
  });
};

module.exports = {
  getAllLines: getAllLines,
  addLine: addLine,
  findUserlines: findUserlines
};
