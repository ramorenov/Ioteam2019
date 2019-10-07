"use strict";

const express = require("express");
const bodyParse = require("body-parser");

const initSensorRouter = require("./api");

const app = express();

app.use(bodyParse.json());

function initApp() {
  initSensorRouter(app);

  return app;
}

module.exports = initApp;
