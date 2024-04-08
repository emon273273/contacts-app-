const { isValidObjectId } = require("mongoose");
const Contact = require("./Contact");
const { log } = require("console");
exports.getAllContact = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.render("index", { contacts, error: {} });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "error occured",
      });
    });
};

exports.getSingleContact = (req, res) => {
  let { id } = req.params;

  Contact.findById(id)
    .then((singlecontact) => {
      res.json(singlecontact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "error occured",
      });
    });
};

exports.createContact = (req, res) => {
  let { name, phone, email } = req.body;

  let error = {};

  if (!name) {
    error.name = "please provide your name";
  }
  if (!phone) {
    error.phone = "please provide your phone";
  }
  if (!email) {
    error.email = "please provide your email";
  }

  let iserror = Object.keys(error).length > 0;

  if (iserror) {
    Contact.find()
      .then((contacts) => {
        res.render("index", { contacts, error }); // Render the view with error messages
      })
      .catch((e) => {
        console.log(e);
        res.json({ message: "Error Occurred" });
      });
  } else {
    let contacts = new Contact({
      name: name,
      email: email,
      phone: phone,
    });

    contacts
      .save()
      .then((c) => {
        // Contact.find().then((contacts) => {
        //   return res.render("index", { contacts, error: {} });
        // });
        Contact.find()
          .then((contacts) => {
            return res.render("index", { contacts, error: {} });
          })
          .catch((e) => {
            console.log(e);
            res.json({
              message: "error occured",
            });
          });
      })
      .catch((e) => {
        console.log(e);
        res.json({ message: "Error Occurred in save" });
      });
  }
};

//update contact
exports.updateContact = (req, res) => {
  let { name, email, phone } = req.body;

  let { id } = req.params;

  Contact.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
        phone,
      },
    },
    {
      new: true,
    }
  )
    .then((newupdatecontact) => {
      res.json(newupdatecontact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "error occured",
      });
    });
};

exports.deleteContact = (req, res) => {
  let { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "invalid id formats",
    });
  }

  Contact.findOneAndDelete({
    _id: id,
  })
    .then((del) => {
      res.json(del);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "error occured",
      });
    });
};
