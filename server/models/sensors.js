const mongoose = require("mongoose");

const sensorsSchema = new mongoose.Schema(
  {
    sensor_type: {
      type: String,
      required: true
    },
    instant_value: {
      type: Number
    },
    event_type: {
      type: String
    },
    activated: {
      type: Boolean,
      defalut: false
    }
  },
  { timestamps: true }
);

const Sensors = mongoose.model("Sensors", sensorsSchema);

module.exports = { Sensors };
