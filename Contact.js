const { Schema, model } = require("mongoose");

//schema
const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
    minlength: 11,
    maxlength: 11,
  },
});

//model

const Contact = model("Contact", contactSchema);

module.exports=Contact;
