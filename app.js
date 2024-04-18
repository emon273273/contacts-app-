const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./routes");
const app = express();

require("dotenv").config();
//middlware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/contacts", router);
// setup ejs
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODB_URI;

mongoose
  .connect(mongodbURI, {
    usenewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on Port${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

const assignment = (req, res, next) => {
  const iscompleted = req.body;

  if (iscompleted) {
    res.json("ok good to celebrate");
    next();
  } else {
    return res.send("sorry ! . this year your eid will be mati .");
  }
};

app.get("/eidwish", assignment, (req, res) => {
  const wish = "Taqaballahu minna wa minkum.Eid Mubarak";
  res.send(wish);
});
