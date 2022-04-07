const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
      type: String,
      required: true,
  },
  password: {
      type: String,
      required: true,
  },
  admin: {
      type: Boolean,
      default: false
  }
});
var Users = mongoose.model('Users',userSchema);
module.exports = Users;