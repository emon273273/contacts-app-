const Contact = require("./Contact");

//get all contacts
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

//get single contacts
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

//create contract
exports.createContact = (req, res) => {
  let { name, phone, email, id } = req.body;

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
        return res.render("index", { contacts, error }); // Render the view with error messages
      })
      .catch((e) => {
        console.log(e);
        return res.json({ message: "Error Occurred" });
      });
  } else {
    if (id) {
      Contact.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            email,
            phone,
          },
        }
      )
        .then(() => {
          Contact.find().then((contacts) => {
            res.render("index", { contacts, error: {} });
          });
        })
        .catch((e) => {
          console.log(e);
          return res.json({
            message: "error occured",
          });
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
      new: true, //always return new data
    }
  )
    .then((contact) => {
      res.json(contact);
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

  Contact.findOneAndDelete({ _id: id }).then(() => {
    Contact.find().then((contacts) => {
      res.render("index", { contacts, error: {} });
    });
  });
};
