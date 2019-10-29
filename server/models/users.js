const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      defalut: false
    }
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = { Users };
