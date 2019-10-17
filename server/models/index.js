const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://IoTeam:Ioteam2019@cluster0-4u9wu.mongodb.net/ioteamDB?retryWrites=true&w=majority";

const { Sensors } = require("./sensors");

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  error => {
    !error ? console.log("Conexión exitosa") : console.log(error);
  }
);

module.exports = { Sensors };
