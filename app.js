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
app.set('view engine','ejs')
app.get("/", (req, res) => {

  res.send("hello")
});

const port = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODB_URI;

mongoose
  .connect(
    mongodbURI,
    {
      usenewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on Port${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
