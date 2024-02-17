const mongoose = require('mongoose');
const validator = require('validator');

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Укажите верный e-mail',
    },
  },
  password: {
    type: String,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});
module.exports = mongoose.model('user', userScheme);
