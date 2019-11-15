"use strict";
const { Sensors } = require("../models");

function logSens(deviceData) {
  const dataArr = [];

  //Logica sensor de temperatura
  if (deviceData.tempSensor > 30) {
    const data = {
      sensor_type: "Temperature",
      instant_value: deviceData.tempSensor,
      event_type: "High temperature level detected",
      activated: true
    };
    dataArr.push(data);
  }

  //Logica sensor de Humedad
  if (deviceData.humSensor > 70) {
    const data = {
      sensor_type: "Humidity",
      instant_value: deviceData.humSensor,
      event_type: "High % Humidity detected",
      activated: true
    };
    dataArr.push(data);
  }

  //Logica sensor de distancia
  if (deviceData.distSensor > 40 && deviceData.distSensor < 50) {
    const data = {
      sensor_type: "Distance",
      instant_value: deviceData.distSensor,
      event_type: "Near obstacle detected",
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

  // Logica sensor de voltaje

  if (deviceData.potSensor > 3) {
    const data = {
      sensor_type: "Voltaje",
      instant_value: deviceData.potSensor,
      event_type: "High voltage level detected",
      activated: true
    };

    dataArr.push(data);
  }

  return dataArr;
}

module.exports = {
  logSens
};
