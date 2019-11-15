const express = require("express");
const router = express.Router();
const LinesModel = require("../models/Lines");

router.get("/", (req, res) => {
  res.send("cvcvbc-");
});

router.get("/getlines", (req, res) => {
  LinesModel.getAllLines().then(result => {
    if (result.success) {
      console.log(result.lines);

      res.status(200).json({ success: "", lines: result.lines });
    }
  });
});

router.post("/addline", (req, res) => {
  LinesModel.addLine(req.body).then(result => {
    if (result.error) {
      res.status(207).json({ error: result.error });
    }
    if (result.success) {
      res.status(200).json({ success: true });
    }
  });
});
module.exports = router;
