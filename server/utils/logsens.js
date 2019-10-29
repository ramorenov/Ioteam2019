"use strict";
const { Sensors } = require("../models");

function logSens(deviceData) {
  const dataArr = [];

  // Logica sensor de voltaje

  if (deviceData.potSensor > 3) {
    const data = {
      sensor_type: "potVoltaje",
      instant_value: deviceData.potSensor,
      event_type: "High voltage level detected",
      activated: true
    };

    dataArr.push(data);
  }

  //Logica sensor de gas
  if (deviceData.gasSensor > 120) {
    const data = {
      sensor_type: "Gas",
      instant_value: deviceData.gasSensor,
      event_type: "High gas concentration level detected",
      activated: true
    };
    dataArr.push(data);
  }
  return dataArr;
}

module.exports = {
  logSens
};
