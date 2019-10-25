"use strict";

const express = require("express");
const bodyParse = require("body-parser");
const initSensorRouter = require("./api");
const authInit = require("./auth");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParse.json());

function initApp() {
  initSensorRouter(app);
  authInit(app);
  return app;
}

module.exports = initApp;
